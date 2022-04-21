const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");
const Post = require("./PostRequisition");

exports.getList = async (req, res) => {
  try {
    let Columns = ["TransNo", "TransDate", "TransType", "Location", "Status"];
    let REQ = await SeqFunc.getAll(
      db[req.headers.compcode].IN_RequisitionMaster,
      {},
      true,
      Columns
    );
    if (REQ.success) {
      // let Data = ;
      REQ.Data.rows.map((val) => {
        switch (val.SubmitStatus) {
          case "0":
            val.Status = "Pending";
            break;
          case "1":
            val.Status = "Submitted";
            break;
          case "2":
            val.Status = "Closed";
            break;
          default:
            val.Status = "Pending";
            break;
        }
        return val;
      });

      ResponseLog.Send200(req, res, REQ.Data);
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getOne = async (req, res) => {
  try {
    let REQ = await SeqFunc.getOne(
      db[req.headers.compcode].IN_RequisitionMaster,
      {
        where: { TransNo: req.query.TransNo },
      }
    );

    if (REQ.success) {
      console.log({Data:REQ.Data})
      let Detail = await SeqFunc.getAll(
        db[req.headers.compcode].IN_RequisitionDetail,
        { where: {TransNo: REQ.Data.TransNo} },
        false,
        [
          "TransNo",
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
        ]
      );
      let Data = {
        Header: REQ.Data,
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
    let REQ = await SeqFunc.getOne(
      db[req.headers.compcode].IN_RequisitionMaster,
      {
        where: { TransNo: req.query.TransNo, SubmitStatus: false },
      }
    );

    if (REQ.success) {
      await SeqFunc.Delete(db[req.headers.compcode].IN_RequisitionDetail, {
        where: { TransNo: REQ.Data.TransNo },
      });
      await SeqFunc.Delete(db[req.headers.compcode].IN_RequisitionMaster, {
        where: { TransNo: REQ.Data.TransNo },
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
    Header.CreatedUser = "1";
    Header.ModifyUser = "1";
    Header.SubmitStatus = 0;
    Header.Status = "Pending";

    let REQData = await SeqFunc.Trans_updateOrCreate(
      db[req.headers.compcode],
      db[req.headers.compcode].IN_RequisitionMaster,
      {
        where: { TransNo: Header.TransNo ? Header.TransNo : "" },
        transaction: t,
      },
      Header,
      t
    );

    if (REQData.success) {
      let i = 1;
      Detail.map((o) => {
        delete o.RID
        o.TransNo = REQData.Data.TransNo;
        o.RLineSeq = i;
        i++;
        return o;
      });

      let REQDetailData = await SeqFunc.Trans_bulkCreate(
        db[req.headers.compcode].IN_RequisitionDetail,
        { where: { TransNo: REQData.Data.TransNo }, transaction: t },
        Detail,
        t
      );
      if (REQDetailData.success) {
        await t.commit();
        if (Header.SubmitStatus) {
          Post.postData(req.res);
        } else {
          if (REQData.created) {
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
  } catch (err) {
    t.rollback();
    ResponseLog.Error200(req, res, err.message);
  }
};
