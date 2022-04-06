const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");

exports.getList = async (req, res) => {
  try {
    let Columns = ["ItemClassCode","ItemClassName","IsActive"];
    let ItemClass = await SeqFunc.getAll(db[req.headers.compcode].IN_ItemClass, {}, true, Columns);
    if (ItemClass.success) {
      ResponseLog.Send200(req, res, ItemClass.Data);
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getOne = async (req, res) => {
  try {
    let ItemClass = await SeqFunc.getOne(db[req.headers.compcode].IN_ItemClass, { where:{ItemClassCode: req.query.ItemClassCode} });

    if (ItemClass.success) {
      let AttributeDetail = await SeqFunc.getAll(
        db[req.headers.compcode].IN_ItemClassAttributes,
        { ItemClassCode: req.query.ItemClassCode },
        false,
        ["AttributeCode","AttributeType","IsVariant"]
      );
      if (Detail.success) {
        let Data = {
          Header: ItemClass.Data,
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
    let ItemClassData = await SeqFunc.getOne(
      db[req.headers.compcode].IN_ItemClass,
      { where: { ItemClassCode: req.query.ItemClassCode } },
      Header
    );

    if (ItemClassData.success) {
      await SeqFunc.Delete(db[req.headers.compcode].IN_ItemClassAttributes, {
        where: { ItemClassID: ItemClassData.Data.ItemClassID },
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

    let ItemClassData = await SeqFunc.updateOrCreate(
      db[req.headers.compcode].IN_ItemClass,
      { where:{ItemClassCode: req.query.ItemClassCode} },
      Header
    );

    if (ItemClassData.success) {
      await SeqFunc.Delete(db[req.headers.compcode].IN_ItemClassAttributes, { where:{ItemClassCode: req.query.ItemClassCode} });

      Detail.map(o => o.ItemClassCode = ItemClassData.Data.ItemClassCode)

      await SeqFunc.bulkCreate(db[req.headers.compcode].IN_ItemClassAttributes,Detail)

      if (ItemClassData.created) {
        ResponseLog.Create200(req, res);
      } else {
        ResponseLog.Update200(req, res);
      }
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};