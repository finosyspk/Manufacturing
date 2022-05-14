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
      "Status",
    ];
    let SO = await SeqFunc.getAll(
      db[req.headers.compcode].SOP_OrderMaster,
      {},
      true,
      Columns
    );
    if (SO.success) {
      SO.Data.rows.map((val) => {
        val.Status = val.SubmitStatus ? "Submitted" : "Pending";
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
    let SO = await SeqFunc.getOne(db[req.headers.compcode].SOP_OrderMaster, {
      where: { TransNo: req.query.TransNo },
    });

    if (SO.success) {
      let Detail = await db[req.headers.compcode].SOP_OrderDetail.findAll({
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
          "Price",
          "Amount",
          "Amount_Cur",
          "TaxScheduleCode",
          "TaxSchedule",
          "TaxAmount",
          "TaxAmount_Cur",
          "NetAmount",
          "NetAmount_Cur",
          "Remarks",
        ],
      });

      let Taxes = await SeqFunc.getAll(
        db[req.headers.compcode].SOP_OrderTaxes,
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
      Detail = JSON.stringify(Detail)
      Detail = JSON.parse(Detail) 
      Detail.map((val) => {
        val.Taxes = Taxes.Data.filter((o) => o.OLineSeq === val.OLineSeq);
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
    let SO = await SeqFunc.getOne(db[req.headers.compcode].SOP_OrderMaster, {
      where: { TransNo: req.query.TransNo, SubmitStatus: false },
    });

    if (SO.success) {
      await SeqFunc.Delete(db[req.headers.compcode].SOP_OrderTaxes, {
        where: { TransNo: SO.Data.TransNo },
      });
      await SeqFunc.Delete(db[req.headers.compcode].SOP_OrderDetail, {
        where: { TransNo: SO.Data.TransNo },
      });
      await SeqFunc.Delete(db[req.headers.compcode].SOP_OrderMaster, {
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
    Header.PromiseDate = new Date();

    let SOData = await SeqFunc.Trans_updateOrCreate(
      db[req.headers.compcode],
      db[req.headers.compcode].SOP_OrderMaster,
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
      let TaxArray = [];

      Detail.map((o) => {
        delete o.RID;
        o.TransNo = SOData.Data.TransNo;
        o.OLineSeq = LineSeq;
        o.Taxes?.map((l) => {
          delete l.RID;
          l.TransNo = o.TransNo;
          l.ItemCode = o.ItemCode;
          l.Item = o.Item;
          l.OLineSeq = o.OLineSeq;
          TaxArray.push(l)
          return l;
        });
        
        LineSeq++;
        return o;
      });

      let DetailData = await SeqFunc.Trans_bulkCreate(
        db[req.headers.compcode].SOP_OrderDetail,
        { where: { TransNo: SOData.Data.TransNo }, transaction: t },
        Detail,
        t
      );

      if (DetailData.success) {
        let TaxesData = await SeqFunc.Trans_bulkCreate(
          db[req.headers.compcode].SOP_OrderTaxes,
          { where: { TransNo: SOData.Data.TransNo }, transaction: t },
          TaxArray,
          t
        );
        if (TaxesData.success) {
          await t.commit();
          if (Header.SubmitStatus) {
            Post.postData(req, res);
          } else {
            if (SOData.created) {
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
