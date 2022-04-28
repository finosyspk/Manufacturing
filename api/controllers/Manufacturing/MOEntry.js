const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");

exports.getList = async (req, res) => {
  try {
    let Columns = [
      "TransNo",
      "TransDate",
      "Item",
      "UOM",
      "RoutingName",
      "Quantity",
      ["MOStatus", "Status"],
    ];
    let MO = await SeqFunc.getAll(
      db[req.headers.compcode].MOP_MOHeader,
      {},
      true,
      Columns
    );
    if (MO.success) {
      ResponseLog.Send200(req, res, MO.Data);
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getOne = async (req, res) => {
  try {
    let MO = await SeqFunc.getOne(db[req.headers.compcode].MOP_MOHeader, {
      where: { TransNo: req.query.TransNo },
    });
    

    switch (MO.Data.MOStatus) {
      case "2":
        MO.Data.MOStatus = "In Process";
        break;

      case "3":
        MO.Data.MOStatus = "Ready to Receive";
        break;

      case "4":
        MO.Data.MOStatus = "Goods Received";
        break;

      case "5":
        MO.Data.MOStatus = "Completed";
        break;

      default:
        break;
    }

    if (MO.success) {
      let Detail = await SeqFunc.getAll(
        db[req.headers.compcode].MOP_MODetail,
        { MOID: MO.Data.MOID },
        false,
        [
          "CItemCode",
          "CItem",
          "Quantity",
          "StageCode",
          "StageName",
          "StageSeq",
          "MachineCode",
          "MachineName",
          "PowerCost",
          "LaborCost",
          "Output",
          "CycleTime",
          "Completed",
        ]
      );

      let Data = {
        Header: MO.Data,
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
    let MO = await SeqFunc.getOne(db[req.headers.compcode].MOP_MOHeader, {
      where: { TransNo: req.query.TransNo, Posted: false },
    });

    if (MO.success) {
      await SeqFunc.Delete(db[req.headers.compcode].MOP_MODetail, {
        where: { MOID: MO.Data.MOID },
      });
      await SeqFunc.Delete(db[req.headers.compcode].MOP_MOHeader, {
        where: { MOID: MO.Data.MOID },
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
    Header.CreatedUser = "1";
    Header.ModifyUser = "1";
    Header.TransStatus = "1";

    let MOData = await SeqFunc.Trans_updateOrCreate(
      db[req.headers.compcode],
      db[req.headers.compcode].MOP_MOHeader,
      db[req.headers.compcode].MOP_NextNo,
      {
        where: { TransNo: Header.TransNo ? Header.TransNo : "" },
        transaction: t,
      },
      Header,
      t
    );

    if (MOData.success) {
      Detail.map((o) => (o.MOID = MOData.Data.MOID));
      let MODetailData = await SeqFunc.Trans_bulkCreate(
        db[req.headers.compcode].MOP_MODetail,
        { where: { MOID: MOData.Data.MOID }, transaction: t },
        Detail,
        t
      );
      if (MODetailData.success) {
        t.commit();
        if (MODetailData.created) {
          ResponseLog.Create200(req, res);
        } else {
          ResponseLog.Update200(req, res);
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
