const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");

exports.getList = async (req, res) => {
  try {
    let Columns = ["UOMHeaderCode","UOMHeader","BaseUOMCode","IsActive"];
    let UOM = await SeqFunc.getAll(db[req.headers.compcode].INV_UOMHeader, {}, true, Columns);
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
    let UOM = await SeqFunc.getOne(db[req.headers.compcode].INV_UOMHeader, { where:{UOMHeaderCode: req.query.UOMHeaderCode} });

    if (UOM.success) {
      let UOMDetail = await SeqFunc.getAll(
        db[req.headers.compcode].INV_UOMDetail,
        { where:{UOMHeaderCode: req.query.UOMHeaderCode} },
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
      db[req.headers.compcode].INV_UOMHeader,
      {
        where: { UOMHeaderCode: req.query.UOMHeaderCode },
      }
    );

    if (UOM.success) {
      await SeqFunc.Delete(db[req.headers.compcode].INV_UOMDetail, {
        where: { UOMHeaderCode: req.query.UOMHeaderCode },
      });
      await SeqFunc.Delete(db[req.headers.compcode].INV_UOMHeader, {
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
    delete Header.UOMHID

    let UOMData = await SeqFunc.updateOrCreate(
      db[req.headers.compcode].INV_UOMHeader,
      { where:{UOMHeaderCode: Header.UOMHeaderCode} },
      Header
    );

    if (UOMData.success) {
      await SeqFunc.Delete(db[req.headers.compcode].INV_UOMDetail, { where:{UOMHeaderCode: Header.UOMHeaderCode} });

      Detail.map(o => {
        o.UOMHID = UOMData.Data.UOMHID
        o.UOMHeaderCode = UOMData.Data.UOMHeaderCode
        o.UOMHeader = UOMData.Data.UOMHeader
        o.IsActive = true
        return o
      })

      await SeqFunc.bulkCreate(db[req.headers.compcode].INV_UOMDetail,Detail)

      if (UOMData.created) {
        ResponseLog.Create200(req, res);
      } else {
        ResponseLog.Update200(req, res);
      }
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};
