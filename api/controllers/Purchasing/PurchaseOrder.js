const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");
const Post = require("./PostOrder");

exports.getList = async (req, res) => {
  try {
    let Columns = [
      "TransNo",
      "TransDate",
      "Vendor",
      "CurrDesc",
      "Location",
      "Total",
      "Description",
      "Status",
    ];
    let PO = await SeqFunc.getAll(
      db[req.headers.compcode].POP_OrderMaster,
      {},
      true,
      Columns
    );
    if (PO.success) {
      PO.Data.rows.map((val) => {
        val.Status = val.SubmitStatus ? "Submitted" : "Pending";
        return val;
      });

      ResponseLog.Send200(req, res, PO.Data);
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getOne = async (req, res) => {
  try {
    let PO = await SeqFunc.getOne(db[req.headers.compcode].POP_OrderMaster, {
      where: { TransNo: req.query.TransNo },
    });

    if (PO.success) {
      let Detail = await db[req.headers.compcode].POP_OrderDetail.findAll({
        where: { TransNo: req.query.TransNo },
        attributes: [
          "TransNo",
          "OLineSeq",
          "RTransNo",
          "RLineSeq",
          "ItemCode",
          "Item",
          "ItemTrackBy",
          "UOMCode",
          "UOM",
          "UnitQuantity",
          "Quantity",
          "BaseQuantity",
          "Price",
          "Amount",
          "Remarks",
        ],
      });

      let Taxes = await SeqFunc.getAll(
        db[req.headers.compcode].POP_OrderTaxes,
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
        val.Taxes = Taxes.Data.filter((o) => o.OLineSeq === val.OLineSeq);
        return val;
      });

      let Data = {
        Header: PO.Data,
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
    let PO = await SeqFunc.getOne(db[req.headers.compcode].POP_OrderMaster, {
      where: { TransNo: req.query.TransNo, SubmitStatus: false },
    });

    if (PO.success) {
      await SeqFunc.Delete(db[req.headers.compcode].POP_OrderTaxes, {
        where: { TransNo: PO.Data.TransNo },
      });
      await SeqFunc.Delete(db[req.headers.compcode].POP_OrderDetail, {
        where: { TransNo: PO.Data.TransNo },
      });
      await SeqFunc.Delete(db[req.headers.compcode].POP_OrderMaster, {
        where: { TransNo: PO.Data.TransNo },
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

    let POData = await SeqFunc.Trans_updateOrCreate(
      db[req.headers.compcode],
      db[req.headers.compcode].POP_OrderMaster,
      db[req.headers.compcode].POP_NextNo,

      {
        where: { TransNo: Header.TransNo ? Header.TransNo : "" },
        transaction: t,
      },
      Header,
      t
    );

    if (POData.success) {
      let LineSeq = 1;

      Detail.map((o) => {
        o.TransNo = POData.Data.TransNo;
        o.OLineSeq = LineSeq;
        o.Taxes?.map((l) => {
          l.OLineSeq = o.OLineSeq;
          return l;
        });
        LineSeq++;
        return o;
      });

      let DetailData = await SeqFunc.Trans_bulkCreate(
        db[req.headers.compcode].POP_OrderDetail,
        { where: { TransNo: POData.Data.TransNo }, transaction: t },
        Detail,
        t
      );

      if (DetailData.success) {
        let TaxesData = await SeqFunc.Trans_bulkCreate(
          db[req.headers.compcode].POP_OrderTaxes,
          { where: { TransNo: POData.Data.TransNo }, transaction: t },
          TaxArray,
          t
        );
        if (TaxesData.success) {
          await t.commit();
          if (Header.SubmitStatus) {
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
