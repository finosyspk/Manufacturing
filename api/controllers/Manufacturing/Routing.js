const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");

exports.getList = async (req, res) => {
  try {
    let Columns = ["RoutingCode","RoutingName","IsActive"];
    let Routing = await SeqFunc.getAll(db[req.headers.compcode].MOP_RoutingHeader, {}, true, Columns);
    if (Routing.success) {
      ResponseLog.Send200(req, res, Routing.Data);
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getOne = async (req, res) => {
  try {
    let Routing = await SeqFunc.getOne(db[req.headers.compcode].MOP_RoutingHeader, { where:{RoutingCode: req.query.RoutingCode} });

    if (Routing.success) {
      let RoutingDetail = await SeqFunc.getAll(
        db[req.headers.compcode].MOP_RoutingDetail,
        { where: {RoutingID: Routing.Data.RoutingID} },
        false,
        ["StageCode","StageName","StageCode","MachineName","StandardHours","StageSeq"]
      );
      if (RoutingDetail.success) {
        let Data = {
          Header: Routing.Data,
          Detail: RoutingDetail.Data
        }
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
    let Routing = await SeqFunc.getOne(
      db[req.headers.compcode].MOP_RoutingHeader,
      { where: { RoutingCode: req.query.RoutingCode } }
    );

    if (Routing.success) {
      await SeqFunc.Delete(db[req.headers.compcode].MOP_RoutingDetail, {
        where: { RoutingID: Routing.Data.RoutingID },
      });
      await SeqFunc.Delete(db[req.headers.compcode].MOP_RoutingHeader, {
        where: { RoutingID: Routing.Data.RoutingID },
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
    delete Header.RoutingID;

    let RoutingData = await SeqFunc.updateOrCreate(
      db[req.headers.compcode].MOP_RoutingHeader,
      { where:{RoutingCode: Header.RoutingCode ? Header.RoutingCode : ''} },
      Header
    );

    if (RoutingData.success) {
      await SeqFunc.Delete(db[req.headers.compcode].MOP_RoutingDetail, { where :{RoutingID: RoutingData.Data.RoutingID} });

      Detail.map(o => {
        delete o.RoutingLineID
        o.RoutingID = RoutingData.Data.RoutingID
        o.RoutingCode = RoutingData.Data.RoutingCode
        o.RoutingName = RoutingData.Data.RoutingName
        return o
      })
      console.log(Detail)
      await SeqFunc.bulkCreate(db[req.headers.compcode].MOP_RoutingDetail,Detail)

      if (RoutingData.created) {
        ResponseLog.Create200(req, res);
      } else {
        ResponseLog.Update200(req, res);
      }
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};
