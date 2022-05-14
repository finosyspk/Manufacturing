const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");
const Post = require("./PostOrder");

exports.getList = async (req, res) => {
  try {
    let Columns = [
      "TransNo",
      "TransDate",
      "Customer",
      "CurrDesc",
      "Location",
      "Total",
      "Description",
      ["RPosted","Status"]
    ];
    let SO = await SeqFunc.getAll(
      db[req.headers.compcode].SOP_DispatchMaster,
      {},
      true,
      Columns
    );
    if (SO.success) {
      SO.Data.rows.map((val) => {
        val.RPosted = val.Posted ? "Posted" : "Un-Posted";
        return val;
      });

      ResponseLog.Send200(req, res, SO.Data);
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getOne = async (req, res) => {
  try {
    let SO = await SeqFunc.getOne(db[req.headers.compcode].SOP_DispatchMaster, {
      where: { TransNo: req.query.TransNo },
    });

    if (SO.success) {
      let Detail = await db[req.headers.compcode].SOP_DispatchDetail.findAll({
        where: { TransNo: req.query.TransNo },
        attributes: [
          "TransNo",
          "OLineSeq",
          "QTransNo",
          "QLineSeq",
          "ItemCode",
          "Item",
          "ItemTrackBy",
          "ItemType",
          "UOMCode",
          "UOM",
          "UnitQuantity",
          "Quantity",
          "BaseQuantity",
          [db[req.headers.compcode].Sequelize.literal(`dbo.GetInventoryStock(ItemCode,'${SO.Data.LocationCode}') + BaseQuantity`), 'QtyBal'],
          "Price",
          "Amount",
          "Remarks",
        ],
      });

      let Taxes = await SeqFunc.getAll(
        db[req.headers.compcode].SOP_DispatchTaxes,
        { where: { TransNo: req.query.TransNo } },
        false,
        [
          "TransNo",
          "OLineSeq",
          "ItemCode",
          "Item",
          "TaxScheduleID",
          "TaxScheduleCode",
          "TaxSchedule",
          "TaxDetailID",
          "TaxDetailCode",
          "TaxDetail",
          "TaxRate",
          "TaxAmount",
          "TaxAmount_Cur",
        ]
      );

      let Batches = await SeqFunc.getAll(
        db[req.headers.compcode].SOP_DispatchBatches,
        { where: { TransNo: req.query.TransNo } },
        false,
        [
          "TransNo",
          "OLineSeq",
          "ItemCode",
          "Item",
          "TaxScheduleID",
          "TaxScheduleCode",
          "TaxSchedule",
          "TaxDetailID",
          "TaxDetailCode",
          "TaxDetail",
          "TaxRate",
          "TaxAmount",
          "TaxAmount_Cur",
        ]
      );

      Detail.map((val) => {
        val.Taxes = Taxes.Data.filter((o) => o.QLineSeq === val.QLineSeq);
        return val;
      });

      let Data = {
        Header: SO.Data,
        Detail: Detail,
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
    let SO = await SeqFunc.getOne(db[req.headers.compcode].SOP_DispatchMaster, {
      where: { TransNo: req.query.TransNo, Posted: false },
    });

    if (SO.success) {
      await SeqFunc.Delete(db[req.headers.compcode].SOP_DispatchTaxes, {
        where: { TransNo: SO.Data.TransNo },
      });
      await SeqFunc.Delete(db[req.headers.compcode].SOP_DispatchDetail, {
        where: { TransNo: SO.Data.TransNo },
      });
      await SeqFunc.Delete(db[req.headers.compcode].SOP_DispatchMaster, {
        where: { TransNo: SO.Data.TransNo },
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
    delete Header.RID;
    Header.CreatedUser = 1;
    Header.ModifyUser = 1;
    Header.PostedUser = 1;

    let SOData = await SeqFunc.Trans_updateOrCreate(
      db[req.headers.compcode],
      db[req.headers.compcode].SOP_DispatchMaster,
      db[req.headers.compcode].SOP_NextNo,
      {
        where: { TransNo: Header.TransNo ? Header.TransNo : "" },
        transaction: t,
      },
      Header,
      t
    );

    if (SOData.success) {
      let LineSeq = 1;

      Detail.map((o) => {
        o.TransNo = SOData.Data.TransNo;
        o.QLineSeq = LineSeq;
        o.Taxes?.map((l) => {
          l.OLineSeq = o.OLineSeq;
          return l;
        });
        LineSeq++;
        return o;
      });

      let DetailData = await SeqFunc.Trans_bulkCreate(
        db[req.headers.compcode].SOP_DispatchDetail,
        { where: { TransNo: SOData.Data.TransNo }, transaction: t },
        Detail,
        t
      );

      if (DetailData.success) {
        let TaxesData = await SeqFunc.Trans_bulkCreate(
          db[req.headers.compcode].SOP_DispatchTaxes,
          { where: { TransNo: SOData.Data.TransNo }, transaction: t },
          BatchArray,
          t
        );
        if (TaxesData.success) {
          await t.commit();
          if (Header.Posted) {
            Post.postData(req, res);
          } else {
            if (DetailData.created) {
              ResponseLog.Create200(req, res);
            } else {
              ResponseLog.Update200(req, res);
            }
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
