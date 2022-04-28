const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");

exports.getList = async (req, res) => {
  try {
    let Columns = [
      "ItemCode",
      "UOMCode",
      "BillStatus",
      "RoutingCode",
      "EffectiveDate",
      "ObseleteDate",
      "StockMethod",
    ];
    let BOM = await SeqFunc.getAll(
      db[req.headers.compcode].MOP_BOMHeader,
      {},
      true,
      Columns
    );
    if (BOM.success) {
      ResponseLog.Send200(req, res, BOM.Data);
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getOne = async (req, res) => {
  try {
    let where = { BOMID: req.query.BOMID }
    if (req.query?.BillStatus){
      where.BillStatus = req.query?.BillStatus
    }
    let BOM = await SeqFunc.getOne(db[req.headers.compcode].MOP_BOMHeader, {where: where});

    if (BOM.success) {
      let BOMDetail = await SeqFunc.getAll(
        db[req.headers.compcode].MOP_BOMDetail,
        { where:{BOMID: req.query.BOMID} },
        false,
        [
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
          "MachineCode",
          "MachineName",
          "PowerPerUnit",
          "LaborPerUnit",
          "OutputPerUnit",
          "StandardHours",
        ]
      );
      if (BOMDetail.success) {
        let Data = {
          Header: BOM.Data,
          Detail: BOMDetail.Data,
        };
        ResponseLog.Send200(req, res, Data);
      } else {
        ResponseLog.Error200(req, res, "No Record Found!");
      }
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    let Routing = await SeqFunc.getOne(db[req.headers.compcode].MOP_BOMHeader, {
      where: { BOMID: req.query.BOMID },
    });

    if (Routing.success) {
      await SeqFunc.Delete(db[req.headers.compcode].MOP_BOMDetail, {
        where: { BOMID: Routing.Data.BOMID },
      });
      await SeqFunc.Delete(db[req.headers.compcode].MOP_BOMHeader, {
        where: { BOMID: Routing.Data.BOMID },
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
  try {
    let Header = req.body.Header;
    let Detail = req.body.Detail;
    delete Header.BOMID 

    let BOMData = await SeqFunc.updateOrCreate(
      db[req.headers.compcode].MOP_BOMHeader,
      { where: { BOMID: Header.BOMID ? Header.BOMID : 0 } },
      Header
    );

    if (BOMData.success) {
      await SeqFunc.Delete(db[req.headers.compcode].MOP_BOMDetail, {
        where: { BOMID: BOMData.Data.BOMID },
      });

      Detail.map((o) => {
        delete o.BOMLineID;
        delete o.BOMID;
        o.BOMID = BOMData.Data.BOMID;
        o.RoutingName = BOMData.Data.RoutingName;
      });
      console.log({ Detail });
      await SeqFunc.bulkCreate(db[req.headers.compcode].MOP_BOMDetail, Detail);

      if (BOMData.created) {
        ResponseLog.Create200(req, res);
      } else {
        ResponseLog.Update200(req, res);
      }
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};
