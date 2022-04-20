const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");
const Stock = require("../../../core/Stock");
const Post = require("./PostAdjustment");

exports.getList = async (req, res) => {
  try {
    let Columns = [
      "TransNo",
      "TransDate",
      "TransType",
      "Location",
      ["RPosted", "Status"],
    ];
    let ADJ = await SeqFunc.getAll(
      db[req.headers.compcode].IN_TransactionHeader,
      {},
      true,
      Columns
    );
    if (ADJ.success) {
      ADJ.Data.rows.map((val) => {
        val.RPosted = val.Posted ? "Posted" : "Un-Posted";
        return val;
      });

      ResponseLog.Send200(req, res, ADJ.Data);
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getOne = async (req, res) => {
  try {
    let ADJ = await SeqFunc.getOne(
      db[req.headers.compcode].IN_TransactionHeader,
      {
        where: { TransNo: req.query.TransNo },
      }
    );

    if (ADJ.success) {
      let Detail = await SeqFunc.getAll(
        db[req.headers.compcode].IN_TransactionDetail,
        { TRID: ADJ.Data.TRID },
        false,
        [
          "TransNo",
          "TLineSeq",
          "ItemCode",
          "Item",
          "ItemTrackBy",
          "UOMCode",
          "UOM",
          "UnitQuantity",
          "Quantity",
          "BaseQuantity",
          "UnitCost",
          "Remarks",
        ]
      );

      let Batches = await SeqFunc.getAll(
        db[req.headers.compcode].IN_TransactionBatches,
        { TRID: ADJ.Data.TRID },
        false,
        [
          "TransNo",
          "TLineSeq",
          "BatchNo",
          "ExpiryDate",
          "Quantity",
          "BaseQuantity",
        ]
      );

      Detail.Data.map((val) => {
        val.Batches = Batches.Data.filter((o) => o.TLineSeq === val.TLineSeq);
        return val;
      });

      let Data = {
        Header: ADJ.Data,
        Detail: Detail.Data,
      };

      ResponseLog.Send200(req, res, Data);
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    let ADJ = await SeqFunc.getOne(
      db[req.headers.compcode].IN_TransactionHeader,
      {
        where: { TransNo: req.query.TransNo, Posted: false },
      }
    );

    if (ADJ.success) {
      await SeqFunc.Delete(db[req.headers.compcode].IN_TransactionBatches, {
        where: { TRID: ADJ.Data.TRID },
      });
      await SeqFunc.Delete(db[req.headers.compcode].IN_TransactionDetail, {
        where: { TRID: ADJ.Data.TRID },
      });
      await SeqFunc.Delete(db[req.headers.compcode].IN_TransactionHeader, {
        where: { TRID: ADJ.Data.TRID },
      });
      ResponseLog.Delete200(req, res);
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.CreateOrUpdate = async (req, res) => {
  const t = await db[req.headers.compcode].sequelize.transaction();
  try {

    let Header = req.body.Header;
    let Detail = req.body.Detail;
    delete Header.TRHID
    Header.CreatedUser = 1;
    Header.ModifyUser = 1;
    Header.PostedUser = 1;
    // Header.Posted = 0;

    let ADJData = await SeqFunc.Trans_updateOrCreate(
      db[req.headers.compcode],
      db[req.headers.compcode].IN_TransactionHeader,
      {
        where: { TransNo: Header.TransNo ? Header.TransNo : "" },
        transaction: t,
      },
      Header,
      t
    );

    if (ADJData.success) {
      let BatchArray = [];
      let LineSeq  = 1
      Detail.map((o) => {
        o.TRID = ADJData.Data.TRID;
        o.TransNo = ADJData.Data.TransNo
        o.TLineSeq = LineSeq
        if (o.ItemTrackBy !== "None") {
          o.Batches.map((BData) => {
            let Bquery = {
              TransNo: ADJData.Data.TransNo,
              BatchNo: BData.BatchNo,
              ExpiryDate: o.ItemTrackBy === "Batch" ? null : BData.ExpiryDate,
              Quantity: BData.Quantity,
              UnitQuantity: BData.UnitQuantity,
              TLineSeq: o.TLineSeq,
            };
            BatchArray.push(Bquery);
          });
        }
        LineSeq++
        return o;
      });

      let ADJDetailData = await SeqFunc.Trans_bulkCreate(
        db[req.headers.compcode].IN_TransactionDetail,
        { where: { TRID: ADJData.Data.TRID }, transaction: t },
        Detail,
        t
      );
      if (ADJDetailData.success) {
        let ADJBatchData = await SeqFunc.Trans_bulkCreate(
          db[req.headers.compcode].IN_TransactionBatches,
          { where: { TransNo: ADJData.Data.TransNo }, transaction: t },
          BatchArray,
          t
        );
        if (ADJBatchData.success) {
          let Allocation = {};
          if (Header.FormType !== "AdjInward") {
            Allocation = await Stock.Allocation.Allocation(Detail,ADJData.Data.TransNo,ADJData.Data.LocationCode ,t);
          } else {
            Allocation.Success = true;
          }
          if (Allocation.Success === true) {
            await t.commit();
            console.log({Posted:Header.Posted})
            if (Header.Posted) {
              Post.postData(req,res);
            } else {
              if (ADJDetailData.created) {
                ResponseLog.Create200(req, res);
              } else {
                ResponseLog.Update200(req, res);
              }
            }
    
          } else {
            t.rollback();
            res.status(200).send({ Success: false, Message: Allocation.Message, data: Allocation.data })
          }
        } else {
          t.rollback();
          ResponseLog.Error200(req, res, "Error Saving Record!");
        }
      } else {
        t.rollback();
        ResponseLog.Error200(req, res, "Error Saving Record!");
      }
    } else {
      t.rollback();
      ResponseLog.Error200(req, res, "Error Saving Record!");
    }
  } catch (err) {
    t.rollback();
    ResponseLog.Error200(req, res, err.message);
  }
};
