const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");
const Post = require("./PostQuote");

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
    let SQ = await SeqFunc.getAll(
      db[req.headers.compcode].SOP_QuoteMaster,
      {},
      true,
      Columns
    );
    if (SQ.success) {
      SQ.Data.rows.map((val) => {
        val.Status = val.SubmitStatus ? "Submitted" : "Pending";
        return val;
      });

      ResponseLog.Send200(req, res, SQ.Data);
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getOne = async (req, res) => {
  try {
    let SQ = await SeqFunc.getOne(db[req.headers.compcode].SOP_QuoteMaster, {
      where: { TransNo: req.query.TransNo },
    });

    if (SQ.success) {
      let Detail = await db[req.headers.compcode].SOP_QuoteDetail.findAll({
        where: { TransNo: req.query.TransNo },
        attributes: [
          "TransNo",
          "QLineSeq",
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
        db[req.headers.compcode].SOP_QuoteTaxes,
        { where: { TransNo: req.query.TransNo } },
        false,
        [
          "TransNo",
          "QLineSeq",
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
        Header: SQ.Data,
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
    let SQ = await SeqFunc.getOne(db[req.headers.compcode].SOP_QuoteMaster, {
      where: { TransNo: req.query.TransNo, SubmitStatus: false },
    });

    if (SQ.success) {
      await SeqFunc.Delete(db[req.headers.compcode].SOP_QuoteTaxes, {
        where: { TransNo: SQ.Data.TransNo },
      });
      await SeqFunc.Delete(db[req.headers.compcode].SOP_QuoteDetail, {
        where: { TransNo: SQ.Data.TransNo },
      });
      await SeqFunc.Delete(db[req.headers.compcode].SOP_QuoteMaster, {
        where: { TransNo: SQ.Data.TransNo },
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

    let SQData = await SeqFunc.Trans_updateOrCreate(
      db[req.headers.compcode],
      db[req.headers.compcode].SOP_QuoteMaster,
      {
        where: { TransNo: Header.TransNo ? Header.TransNo : "" },
        transaction: t,
      },
      Header,
      t
    );

    if (SQData.success) {
      let LineSeq = 1;

      Detail.map((o) => {
        o.TransNo = SQData.Data.TransNo;
        o.QLineSeq = LineSeq;
        o.Taxes?.map((l) => {
          l.QLineSeq = o.QLineSeq;
          return l;
        });
        LineSeq++;
        return o;
      });

      let DetailData = await SeqFunc.Trans_bulkCreate(
        db[req.headers.compcode].SOP_QuoteDetail,
        { where: { TransNo: SQData.Data.TransNo }, transaction: t },
        Detail,
        t
      );

      if (DetailData.success) {
        let TaxesData = await SeqFunc.Trans_bulkCreate(
          db[req.headers.compcode].SOP_QuoteTaxes,
          { where: { TransNo: SQData.Data.TransNo }, transaction: t },
          BatchArray,
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
