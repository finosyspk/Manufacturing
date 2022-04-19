const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");
const MaterialData = require("../../../core/MaterialData");



exports.getLocations = async (req, res) => {
  try {
    let Columns = [];

    Columns = ["LocationCode", "Location"];
    let Location = await SeqFunc.getAll(db[req.headers.compcode].IN_Location, {where :{IsActive:true, IsTransit: false}}, true, Columns);

    
    ResponseLog.Send200(req, res, {
      Location: Location.Data,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getInTransitLocations = async (req, res) => {
  try {
    let Columns = [];

    Columns = ["LocationCode", "Location"];
    let Location = await SeqFunc.getAll(db[req.headers.compcode].IN_Location, {where :{IsActive:true, IsTransit: true}}, true, Columns);

    
    ResponseLog.Send200(req, res, {
      Location: Location.Data,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getInventoryItems = async (req, res) => {
  try {
    let sQuery = `SELECT ItemCode, Item, LocationCode, Location, ItemType='Inventoried Item', ItemTrackBy, Price = AVG(UnitPrice), QtyIn = SUM(Quantity), 
                  QtyAlloc = SUM(ISNULL(A.QtyOut,0)), QtyOut = SUM(ISNULL(D.QtyOut,0)), QtyBal = SUM(Quantity) - (SUM(ISNULL(A.QtyOut,0)) + SUM(ISNULL(D.QtyOut,0)))FROM IN_StockMaster S
                  LEFT OUTER JOIN (SELECT HeaderNo, QtyOut = SUM(QtyOut) FROM IN_StockAlloc GROUP BY HeaderNo) AS A ON S.HeaderNo = A.HeaderNo
                  LEFT OUTER JOIN (SELECT HeaderNo, QtyOut = SUM(QtyOut) FROM IN_StockDetail GROUP BY HeaderNo) AS D ON S.HeaderNo = D.HeaderNo
                  WHERE LocationCode = :LocationCode
                  GROUP BY LocationCode, ItemCode, Item, Location, ItemTrackBy`;

    let ItemData = await db[req.headers.compcode].sequelize.query(sQuery, {
      replacements: { LocationCode: req.query.LocationCode},
      type: db[req.headers.compcode].Sequelize.QueryTypes.SELECT,
    });

    let columns = ["ItemCode","Item","Location","ItemType","ItemTrackBy","Price","QtyIn","QtyBal"]
    let Data = await MaterialData.Register(ItemData,columns);
    
    ResponseLog.Send200(req, res, {
      Item: Data,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getItems = async (req, res) => {
  try {
    let Columns = [];
    let params = req.query.ItemType ? { ItemType : req.query.ItemType } : {}

    Columns = ["ItemCode", "Item", "ItemType"];
    let Item = await SeqFunc.getAll(db[req.headers.compcode].IN_Item, { where : params}, true, Columns);

    
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

    let Columns = [];

    Columns = ["UOMCode","UOM",["QTYEQV","UnitQuantity"]];
    let ItemUOM = await SeqFunc.getAll(db[req.headers.compcode].IN_ItemUOM, {where: { ItemCode: req.query.ItemCode, IsActive: 1 }}, true, Columns);
    ResponseLog.Send200(req, res, {
      ItemUOM: ItemUOM.Data,
    });

  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getUOMClass = async (req, res) => {
  try {
    let Columns = [];

    Columns = ["UOMHeaderCode", "UOMHeader"];
    let UOMClass = await SeqFunc.getAll(db[req.headers.compcode].IN_UOMHeader, {where :{IsActive:true}}, true, Columns);
    
    ResponseLog.Send200(req, res, {
      UOMClass: UOMClass.Data,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getUOM = async (req, res) => {
  try {
    let Columns = [];

    Columns = ["UOMCode", "UOM"];
    let UOMClass = await SeqFunc.getAll(db[req.headers.compcode].IN_UOMDetail, {where :{UOMHeaderCode: req.query.UOMHeaderCode, IsActive:true}}, true, Columns);
    
    ResponseLog.Send200(req, res, {
      UOMClass: UOMClass.Data,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getAttributeHeads = async (req, res) => {
  try {
    let Columns = [];

    Columns = ["AttHeadCode", "AttHead"];
    let AttributeHead = await SeqFunc.getAll(db[req.headers.compcode].IN_AttributeHead, {where :{IsActive:true}}, true, Columns);
    
    ResponseLog.Send200(req, res, {
      AttributeHead: AttributeHead.Data,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getAttributeCodes = async (req, res) => {
  try {
    let Columns = [];

    Columns = ["AttCode", "AttValue"];
    let AttributeCode = await SeqFunc.getAll(db[req.headers.compcode].IN_AttributeCode, {where :{AttHeadCode: req.query.AttHeadCode}}, true, Columns);
    
    ResponseLog.Send200(req, res, {
      AttributeCode: AttributeCode.Data,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getItemClass = async (req, res) => {
  try {
    let Columns = [];

    Columns = ["ItemClassCode", "ItemClass"];
    let ItemClass = await SeqFunc.getAll(db[req.headers.compcode].IN_ItemClass, {where :{IsActive: 1}}, true, Columns);
    
    ResponseLog.Send200(req, res, {
      ItemClass: ItemClass.Data,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getItemClassAttributes = async (req, res) => {
  try {
    let Columns = [];

    Columns = ["AttributeCode","AttributeType","IsVariant","AttHeadCode","AttHead"];
    let ItemClass = await SeqFunc.getAll(db[req.headers.compcode].IN_ItemClassAttributes, {where :{ItemClassCode: req.query.ItemClassCode}}, false, Columns);
    
    ResponseLog.Send200(req, res, {
      ItemClass: ItemClass.Data,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

// exports.getInventoryItems = async (req, res) => {
//   try {

//     let sqlQuery =  `SELECT LocationCode, ItemCode, Price = AVG(UnitPrice), QtyIn = SUM(QtyIn), QtyAlloc = SUM(ISNULL(A.QtyOut,0)), QtyOut = SUM(ISNULL(D.QtyOut,0)) FROM IN_StockMaster S
//                     LEFT OUTER JOIN (SELECT HeaderNo, QtyOut = SUM(QtyOut) FROM IN_StockAlloc GROUP BY HeaderNo) AS A ON S.HeaderNo = A.HeaderNo
//                     LEFT OUTER JOIN (SELECT HeaderNo, QtyOut = SUM(QtyOut) FROM IN_StockDetail GROUP BY HeaderNo) AS D ON S.HeaderNo = D.HeaderNo
//                     WHERE LocationCode = '${req.body.LocationCode}'
//                     GROUP BY LocationCode, ItemCode`;

//     let InvItems = await db[req.headers.compcode].sequelize.query(sqlQuery,{replacements : {LocationCode : req.query.LocationCode},type : db[req.headers.compcode].Sequelize.QueryTypes.SELECT}) 

//     ResponseLog.Send200(req, res, { InvItems: InvItems });
//   } catch (err) {
//     console.log(err);
//     ResponseLog.Error200(req, res, err.message);
//   }
// };

