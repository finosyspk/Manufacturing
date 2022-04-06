const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");

exports.getList = async (req, res) => {
  try {
    let Columns = ["UOMHeaderCode","UOMHeader","BaseUOM","IsActive"];
    let UOM = await SeqFunc.getAll(db[req.headers.compcode].IN_UOMHeader, {}, true, Columns);
    if (UOM.success) {
      ResponseLog.Send200(req, res, UOM.Data);
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getOne = async (req, res) => {
  try {
    let UOM = await SeqFunc.getOne(db[req.headers.compcode].IN_UOMHeader, { where:{UOMHeaderCode: req.query.UOMHeaderCode} });

    if (UOM.success) {
      let UOMDetail = await SeqFunc.getAll(
        db[req.headers.compcode].IN_UOMDetail,
        { UOMHeaderCode: req.query.UOMHeaderCode },
        false,
        ["UOMCode","UOM"]
      );
      if (UOMDetail.success) {
        let Data = {
          Header: UOM.Data,
          Detail: UOMDetail.Data
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
    let UOM = await SeqFunc.getOne(
      db[req.headers.compcode].IN_UOMHeader,
      {
        where: { UOMHeaderCode: req.query.UOMHeaderCode },
      }
    );

    if (UOM.success) {
      await SeqFunc.Delete(db[req.headers.compcode].IN_UOMDetail, {
        where: { UOMHeaderCode: req.query.UOMHeaderCode },
      });
      await SeqFunc.Delete(db[req.headers.compcode].IN_UOMHeader, {
        where: { UOMHeaderCode: req.query.UOMHeaderCode },
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

    let AttributeData = await SeqFunc.updateOrCreate(
      db.IN_UOMHeader,
      { where:{UOMHeaderCode: req.query.UOMHeaderCode} },
      Header
    );

    if (AttributeData.success) {
      await SeqFunc.Delete(db[req.headers.compcode].IN_UOMDetail, { where:{UOMHeaderCode: req.query.UOMHeaderCode} });

      Detail.map(o => o.UOMHeaderCode = AttributeData.Data.UOMHeaderCode)

      await SeqFunc.bulkCreate(db[req.headers.compcode].IN_UOMDetail,Detail)

      if (AttributeData.created) {
        ResponseLog.Create200(req, res);
      } else {
        ResponseLog.Update200(req, res);
      }
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};
