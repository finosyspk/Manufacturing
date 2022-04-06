const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");

exports.getList = async (req, res) => {
  try {
    let Columns = [["AttHeadCode","Attribute Head Code"],["AttHeadDesc","Attribute Head Desc"],"IsActive"];
    let Attribute = await SeqFunc.getAll(db[req.headers.compcode].IN_AttributeHead, {}, true, Columns);
    if (Attribute.success) {
      ResponseLog.Send200(req, res, Attribute.Data);
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getOne = async (req, res) => {
  try {
    let Attribute = await SeqFunc.getOne(db[req.headers.compcode].IN_AttributeHead, { where:{AttHeadID: req.query.AttHeadID} });

    if (Attribute.success) {
      let AttributeDetail = await SeqFunc.getAll(
        db.IN_AttributeCode,
        { AttHeadID: req.query.AttHeadID },
        false,
        [["AttCodeID","Attribute Code"],["AttCodeDesc","Attribute Desc"]]
      );
      if (AttributeDetail.success) {
        let Data = {
          Header: Attribute.Data,
          Detail: AttributeDetail.Data
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
    let Attributes = await SeqFunc.getOne(
      db[req.headers.compcode].IN_AttributeHead,
      {
        where: { AttHeadID: req.query.AttHeadID },
      }
    );

    if (Attributes.success) {
      await SeqFunc.Delete(db[req.headers.compcode].IN_AttributeCode, {
        where: { AttHeadID: req.query.AttHeadID },
      });
      await SeqFunc.Delete(db[req.headers.compcode].IN_AttributeHead, {
        where: { AttHeadID: req.query.AttHeadID },
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
      db.IN_AttributeHead,
      { where:{AttHeadID: req.query.AttHeadID} },
      Header
    );

    if (AttributeData.success) {
      await SeqFunc.Delete(db[req.headers.compcode].IN_AttributeCode, { where:{AttHeadID: req.query.AttHeadID} });

      Detail.map(o => o.AttHeadID = AttributeData.Data.AttHeadID)

      await SeqFunc.bulkCreate(db[req.headers.compcode].IN_AttributeCode,Detail)

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
