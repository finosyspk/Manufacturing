const db = require("../../models/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");

exports.getList = async (req, res) => {
  try {
    let Columns = ["RoleName", "IsActive"];
    let Roles = await SeqFunc.getAll(db.Roles, {}, true, Columns);
    if (Roles.success) {
      ResponseLog.Error200(req, res, Roles.Data);
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getOne = async (req, res) => {
  try {
    let Roles = await SeqFunc.getOne(db.Roles, { RoleID: req.query.RoleID });

    if (Roles.success) {
      let RoleDetail = await SeqFunc.getAll(
        db.RoleDetail,
        { RoleID: req.query.RoleID },
        false,
        ["ControlID","Create","View","Edit","Delete","Post","Approval"]
      );
      if (Detail.success) {
        let Data = {
          Header: Roles.Data,
          Detail: RoleDetail.Data
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
    let RoeDetail = await SeqFunc.Delete(db.Roles, { RoleID: req.query.RoleID });

    if (RoeDetail.success) {
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

    let RoleData = await SeqFunc.updateOrCreate(
      db.Roles,
      { RoleID: Header.RoleID ? Header.RoleID : 0 },
      Header
    );

    if (RoleData.success) {
      await SeqFunc.Delete(db.RoleDetail, { RoleID: RoleData.Data.RoleID });

      Detail.map(o => o.RoleID = RoleData.Data.RoleID)

      await SeqFunc.bulkCreate(db.RoleDetail,Detail)

      if (RoleData.created) {
        ResponseLog.Create200(req, res);
      } else {
        ResponseLog.Update200(req, res);
      }
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};
