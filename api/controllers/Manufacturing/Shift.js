const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");

exports.getList = async (req, res) => {
  try {
    let Columns = ["ShiftName","IsActive","StartAt","Shifts"];
    let Shift = await SeqFunc.getAll(db[req.headers.compcode].MOP_ShiftMaster, {}, true, Columns);
    if (Shift.success) {
      ResponseLog.Send200(req, res, Shift.Data);
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getOne = async (req, res) => {
  try {
    let Shift = await SeqFunc.getOne(db[req.headers.compcode].MOP_ShiftMaster, { where: {ShiftHead: req.query.ShiftHead} });

    if (Shift.success) {
      let ShiftDetail = await SeqFunc.getAll(
        db[req.headers.compcode].MOP_ShiftDetail,
        { where:{ShiftHeadID: Shift.Data.ShiftHeadID} },
        false,
        ["ShiftDName","StartAt","EndAt"]
      );
      if (ShiftDetail.success) {
        let Data = {
          Header: Shift.Data,
          Detail: ShiftDetail.Data
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
    let Shift = await SeqFunc.getOne(
      db[req.headers.compcode].MOP_ShiftMaster,
      { where: { ShiftHead: req.query.ShiftHead } }
    );

    if (Shift.success) {
      await SeqFunc.Delete(db[req.headers.compcode].MOP_ShiftDetail, {
        where: { ShiftHeadID: Shift.Data.ShiftHeadID },
      });
      await SeqFunc.Delete(db[req.headers.compcode].MOP_ShiftMaster, {
        where: { ShiftHeadID: Shift.Data.ShiftHeadID },
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
    delete Header.ShiftHeadID;

    let Shift = await SeqFunc.updateOrCreate(
      db[req.headers.compcode].MOP_ShiftMaster,
      { where:{ShiftHead: Header.ShiftHead ? Header.ShiftHead : ''} },
      Header
    );

    console.log({Shift:Shift.Data})
    if (Shift.success) {
      await SeqFunc.Delete(db[req.headers.compcode].MOP_ShiftDetail, { where:{ShiftHeadID: Shift.Data.ShiftHeadID} });

      Detail.map(o => {
        o.ShiftHeadID = Shift.Data.ShiftHeadID
        o.ShiftHead = Shift.Data.ShiftHead
        o.ShiftName = Shift.Data.ShiftName
        return o;
      })


      await SeqFunc.bulkCreate(db[req.headers.compcode].MOP_ShiftDetail,Detail)

      if (Shift.created) {
        ResponseLog.Create200(req, res);
      } else {
        ResponseLog.Update200(req, res);
      }
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};
