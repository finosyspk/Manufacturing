const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");
const MaterialData = require("../../../core/MaterialData");


exports.getLocations = async (req, res) => {
  try {
    let Columns = [];

    Columns = ["LocationCode", "Location"];
    let Location = await SeqFunc.getAll(db[req.headers.compcode].IN_Location, {where :{IsActive:true}}, true, Columns);

    
    ResponseLog.Send200(req, res, {
      Location: Location.Data,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getItems = async (req, res) => {
  try {
    let Columns = [];

    Columns = ["ItemCode", "Item"];
    let Item = await SeqFunc.getAll(db[req.headers.compcode].IN_Item, {}, true, Columns);

    
    ResponseLog.Send200(req, res, {
      Item: Item.Data,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getItemUOM = async (req, res) => {
  try {
    let UOM = await db[req.headers.compcode].IN_ItemUOM.findAll({
      attributes: [
        "UOMCode",
        "UOM",
        ["QTYEQV","UnitQuantity"]
      ],
      where: { ItemCode: req.query.ItemCode, IsActive: 1 },
    });

    let RegData = await MaterialData.Register(UOM, [
      "UOMCode",
      "UOM",
      "UnitQuantity"
    ]);
    ResponseLog.Send200(req, res, { ItemUOM: RegData });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

