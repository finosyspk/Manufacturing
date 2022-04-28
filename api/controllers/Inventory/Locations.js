const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");


exports.getList = async (req, res) => {
    try {
      let Columns = ["LocationCode","Location","IsActive"]
      let Location = await SeqFunc.getAll(db[req.headers.compcode].INV_Location,{},true,Columns);
    if (Location.success) {
      ResponseLog.Send200(req, res, Location.Data);
    } else {
      ResponseLog.Send200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getOne = async (req, res) => {
  try {
    
    let Location = await SeqFunc.getOne(db[req.headers.compcode].INV_Location,{where: {LocationCode:req.query.LocationCode}});

    if (Location.success) {
      ResponseLog.Send200(req, res, Location.Data);
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    let Location = await SeqFunc.Delete(db[req.headers.compcode].INV_Location,{ where: {LocationCode: req.query.LocationCode}});

    if (Location.success) {
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
    delete Header.LocationID

    let Data = await SeqFunc.updateOrCreate(
      db[req.headers.compcode].INV_Location,
      { where: {LocationCode: Header.LocationCode} },
      Header
    );

    if (Data.success) {
      if (Data.created) {
        ResponseLog.Create200(req, res);
      } else {
        ResponseLog.Update200(req, res);
      }
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};
