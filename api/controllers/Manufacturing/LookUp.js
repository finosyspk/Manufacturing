const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");
const MaterialData = require("../../../core/MaterialData");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.getRouting = async (req, res) => {
  try {
    let Columns = [];

    Columns = ["MachineCode", "MachineName"];
    let Machine = await SeqFunc.getAll(
      db[req.headers.compcode].MOP_Machine,
      { where: { IsActive: "1" } },
      true,
      Columns
    );

    Columns = ["StageCode", "StageName"];
    let Stages = await SeqFunc.getAll(
      db[req.headers.compcode].MOP_Stages,
      { where: { IsActive: "1" } },
      true,
      Columns
    );
    ResponseLog.Send200(req, res, {
      Machine: Machine.Data,
      Stages: Stages.Data,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getBOM = async (req, res) => {
  try {
    let BOM = await db[req.headers.compcode].MOP_BOMHeader.findAll({
      attributes: [
        "BOMID",
        "ItemCode",
        "ItemName",
        "UOMCode",
        "UOM",
        "RoutingName",
        "RoutingCode",
        "StockMethod"
      ],
      // where: { BillStatus: {[Op.ne] : 'Obselete'} },
    });

    let Routing = await db[req.headers.compcode].MOP_RoutingHeader.findAll({
      attributes: ["RoutingID", "RoutingCode", "RoutingName"],
      where: { IsActive: 1 },
    });

    let BOMData = await MaterialData.Register(BOM, ["ItemCode", "ItemName"]);

    let RegData = await MaterialData.Register(Routing, ["RoutingCode","RoutingName"]);

    ResponseLog.Send200(req, res, { Routing: RegData, BOM: BOMData });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getActiveBOM = async (req, res) => {
  try {
    let Columns = [];

    Columns = ["BOMID", "ItemCode", "ItemName"];
    let BOM = await SeqFunc.getAll(
      db[req.headers.compcode].MOP_BOMHeader,
      { where: { BillStatus: { [Op.ne]: "Obselete" } } },
      true,
      Columns
    );

    ResponseLog.Send200(req, res, {
      BOM: BOM.Data,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getRoutingStages = async (req, res) => {
  try {
    let Stages = await db[req.headers.compcode].MOP_RoutingDetail.findAll({
      attributes: [
        "StageCode",
        "StageName",
        "MachineCode",
        "MachineName",
        "PowerPerUnit",
        "LaborPerUnit",
        "OutputPerUnit",
        "StandardHours",
        "StageSeq",
      ],
      where: { RoutingCode: req.query.RoutingCode },
    });

    let RegData = await MaterialData.Register(Stages, [
      "StageCode",
      "StageName",
    ]);

    ResponseLog.Send200(req, res, { RoutingStages: RegData });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getBOMDetail = async (req, res) => {
  try {
    let BOMDetail = await db[req.headers.compcode].MOP_BOMDetail.findAll({
      attributes: [
        "CItemCode",
        "CItemName",
        "CStatus",
        "UOMCode",
        "UOM",
        "UnitQuantity",
        "Quantity",
        "BaseQuantity",
        "Wastage",
        "StageCode",
        "StageName",
        "StageSeq",
        "MachineCode",
        "MachineName",
        "PowerPerUnit",
        "LaborPerUnit",
        "OutputPerUnit",
        "StandardHours",
      ],
      where: { BOMID: req.query.BOMID },
    });

    ResponseLog.Send200(req, res, { BOMDetail: BOMDetail });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getMODetail = async (req, res) => {
  try {
    let MODetail = await db[req.headers.compcode].MOP_BOMDetail.findAll({
      attributes: [
        "CItemCode",
        "CItemName",
        "CStatus",
        "UOMCode",
        "UOM",
        "UnitQuantity",
        "Quantity",
        "BaseQuantity",
        "Wastage",
        "StageCode",
        "StageName",
        "StageSeq",
        "MachineCode",
        "MachineName",
        "PowerPerUnit",
        "LaborPerUnit",
        "OutputPerUnit",
        "StandardHours",
      ],
      where: { BOMID: req.query.BOMID },
    });

    MODetail.map((val) => {
      let Qty = (val.BaseQuantity + val.Wastage) * req.query.Qty;
      val.BaseQuantity = Qty;
      val.Quantity = Qty;
      val.PowerCost = val.PowerPerUnit * req.query.Qty;
      val.LaborCost = val.LaborPerUnit * req.query.Qty;
      val.Output = val.OutputPerUnit * req.query.Qty;
      val.CycleTime = 0;

      return val;
    });

    ResponseLog.Send200(req, res, { MODetail: MODetail });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getActiveMO = async (req, res) => {
  try {
    let MO = await db[req.headers.compcode].MOP_MOHeader.findAll({
      include:[{
        model: db[req.headers.compcode].MOP_MODetail,
        attributes:["StageCode","StageName","StageSeq","MachineCode","MachineName"],
        where:{Completed:0},
        order:["StageSeq"],
        require: true,
      }],
      where: { TransStatus: 1, MOStatus: {[Op.notIn] : ["Completed","Ready to Receive"]} },
    });

    let RegData = await MaterialData.Register(MO, [
      "TransNo",
      "TransDate",
      "Item",
    ]);

    ResponseLog.Send200(req, res, {
      MO: RegData,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getMOStages = async (req, res) => {
  try {
    let MOStages = await db[req.headers.compcode].MOP_MODetail.findAll({
      attributes: [
        "CItemCode",
        "CItemName",
        "UOMCode",
        "UOM",
        "UnitQuantity",
        "Quantity",
        "BaseQuantity",
        "StageCode",
        "StageName",
        "StageSeq",
        "MachineCode",
        "MachineName",
      ],
      where: { MOID: req.query.MOID, StageCode: req.query.StageCode }
    });

    ResponseLog.Send200(req, res, { MOStages: MOStages });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getMOReceipt = async (req, res) => {
  try {
    let MO = await db[req.headers.compcode].MOP_MOHeader.findAll({
      where: { TransStatus: 1, MOStatus: "Ready to Receive" },
    });

    let RegData = await MaterialData.Register(MO, [
      "TransNo",
      "TransDate",
      "Item",
    ]);

    ResponseLog.Send200(req, res, {
      MO: RegData,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getMOReceiptDetail = async (req, res) => {
  try {

    let sqlQuery = `SELECT CItemCode, CItemName, MD.UOMCode, MD.UOM, MD.UnitQuantity, BaseQuantity=SUM(MD.BaseQuantity), Quantity = SUM(MD.Quantity)
                    FROM MOP_IssuanceDetail MD 
                    INNER JOIN MOP_Issuance MH ON MH.PickID = MD.PickID
                    WHERE MH.MOTransNo = :TransNo 
                    GROUP BY CItemCode, CItemName, MD.UOMCode, MD.UOM, MD.UnitQuantity`;

    let MODetail = await db[req.headers.compcode].sequelize.query(sqlQuery,{replacements : {TransNo : req.query.MOTransNo},type : db[req.headers.compcode].Sequelize.QueryTypes.SELECT}) 

    ResponseLog.Send200(req, res, {
      MODetail: MODetail,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};
