const db = require("../../models/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");


exports.getList = async (req, res) => {
    try {
      let Columns = ["UserName","Designation","Email","ContactNo","IsActive"]
      let Users = await SeqFunc.getAll(db.Users,{},true,Columns);
    if (Users.success) {
      ResponseLog.Error200(req, res, Users.Data);
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getOne = async (req, res) => {
  try {
    
    let Users = await SeqFunc.getOne(db.Users,{UserID:req.query.UserID});

    if (Users.success) {
      let UserRoles = await SeqFunc.getAll(
        db.UserRoles,
        { UserID: req.query.UserID },
        false,
        ["RoleID"]
      );
      if (UserRoles.success) {
        let Data = {
          Header: Users.Data,
          Detail: UserRoles.Data
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
    let Users = await SeqFunc.Delete(db.Users,{UserID:req.query.UserID});

    if (Users.success) {
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

    let Users = await SeqFunc.updateOrCreate(
      db.Users,
      { UserID: Header.UserID ? Header.UserID : 0 },
      Header
    );

    if (Users.success) {
      await SeqFunc.Delete(db.RoleDetail, { UserID: Users.Data.UserID });

      Detail.map(o => o.UserID = Users.Data.UserID)

      await SeqFunc.bulkCreate(db.UserRoles,Detail)

      if (Users.created) {
        ResponseLog.Create200(req, res);
      } else {
        ResponseLog.Update200(req, res);
      }
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};
