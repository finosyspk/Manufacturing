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
    let INV = await SeqFunc.getAll(
      req.sequelizeDB.SOP_InvoiceMaster,
      {},
      true,
      Columns
    );
    if (INV.success) {
      INV.Data.rows.map((val) => {
        val.RPosted = val.Posted ? "Posted" : "Un-Posted";
        return val;
      });

      ResponseLog.Send200(req, res, INV.Data);
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getOne = async (req, res) => {
  try {
    let INV = await SeqFunc.getOne(req.sequelizeDB.SOP_InvoiceMaster, {
      where: { TransNo: req.query.TransNo },
    });

    if (INV.success) {
      let Detail = await req.sequelizeDB.SOP_InvoiceDetail.findAll({
        where: { TransNo: req.query.TransNo },
        attributes: [
          "TransNo",
          "ILineSeq",
          "DTransNo",
          "DLineSeq",
          "ItemCode",
          "Item",
          "ItemTrackBy",
          "ItemType",
          "UOMCode",
          "UOM",
          "JobCode",
          "Job",
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
        req.sequelizeDB.SOP_InvoiceTaxes,
        { where: { TransNo: req.query.TransNo } },
        false,
        [
          "TransNo",
          "ILineSeq",
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

      // let Batches = await SeqFunc.getAll(
      //   req.sequelizeDB.SOP_InvoiceBatches,
      //   { where: { TransNo: req.query.TransNo } },
      //   false,
      //   [
      //     "TransNo",
      //     "ILineSeq",
      //     "ItemCode",
      //     "Item",
      //     "TaxScheduleID",
      //     "TaxScheduleCode",
      //     "TaxSchedule",
      //     "TaxDetailID",
      //     "TaxDetailCode",
      //     "TaxDetail",
      //     "TaxRate",
      //     "TaxAmount",
      //     "TaxAmount_Cur",
      //   ]
      // );

      Detail = JSON.stringify(Detail)
      Detail = JSON.parse(Detail) 
      Detail.map((val) => {
        val.Taxes = Taxes.Data.filter((o) => o.ILineSeq === val.ILineSeq);
        val.Batches = []
        return val;
      });

      let Data = {
        Header: INV.Data,
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
    let INV = await SeqFunc.getOne(req.sequelizeDB.SOP_InvoiceMaster, {
      where: { TransNo: req.query.TransNo, Posted: false },
    });

    if (INV.success) {
      await SeqFunc.Delete(req.sequelizeDB.SOP_InvoiceTaxes, {
        where: { TransNo: INV.Data.TransNo },
      });
      await SeqFunc.Delete(req.sequelizeDB.SOP_InvoiceDetail, {
        where: { TransNo: INV.Data.TransNo },
      });
      await SeqFunc.Delete(req.sequelizeDB.SOP_InvoiceMaster, {
        where: { TransNo: INV.Data.TransNo },
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
  const t = await req.sequelizeDB.sequelize.transaction();
  try {
    let Header = req.body.Header;
    let Detail = req.body.Detail;
    delete Header.RID;
    Header.CreatedUser = 1;
    Header.ModifyUser = 1;
    Header.PostedUser = 1;

    let INVData = await SeqFunc.Trans_updateOrCreate(
      req.sequelizeDB,
      req.sequelizeDB.SOP_InvoiceMaster,
      req.sequelizeDB.SOP_NextNo,
      {
        where: { TransNo: Header.TransNo ? Header.TransNo : "" },
        transaction: t,
      },
      Header,
      t
    );

    if (INVData.success) {
      let LineSeq = 1;
      let TaxArray = [];
      Detail.map((o) => {
        o.TransNo = INVData.Data.TransNo;
        o.ILineSeq = LineSeq;
        o.Taxes?.map((l) => {
          delete l.RID;
          l.TransNo = o.TransNo;
          l.ItemCode = o.ItemCode;
          l.Item = o.Item;
          l.ILineSeq = o.ILineSeq;
          TaxArray.push(l)
          return l;
        });
        LineSeq++;
        return o;
      });

      let DetailData = await SeqFunc.Trans_bulkCreate(
        req.sequelizeDB.SOP_InvoiceDetail,
        { where: { TransNo: INVData.Data.TransNo }, transaction: t },
        Detail,
        t
      );

      if (DetailData.success) {
        let TaxesData = await SeqFunc.Trans_bulkCreate(
          req.sequelizeDB.SOP_InvoiceTaxes,
          { where: { TransNo: INVData.Data.TransNo }, transaction: t },
          TaxArray,
          t
        );
        if (TaxesData.success) {
          await t.commit();
          if (Header.Posted) {
            Post.postData(req, res);
          } else {
            if (INVData.created) {
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
