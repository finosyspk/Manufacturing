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
    let sQuery = `SELECT S.ItemCode, Item, UOMCode, UOM, UnitQuantity, LocationCode, Location, ItemType='Inventoried Item', ItemTrackBy, Price = AVG(UnitPrice), QtyIn = SUM(Quantity), 
                  QtyAlloc = SUM(ISNULL(A.QtyOut,0)), QtyOut = SUM(ISNULL(D.QtyOut,0)), QtyBal = SUM(Quantity) - (SUM(ISNULL(A.QtyOut,0)) + SUM(ISNULL(D.QtyOut,0)))FROM IN_StockMaster S
                  LEFT OUTER JOIN (SELECT HeaderNo, QtyOut = SUM(QtyOut) FROM IN_StockAlloc GROUP BY HeaderNo) AS A ON S.HeaderNo = A.HeaderNo
                  LEFT OUTER JOIN (SELECT HeaderNo, QtyOut = SUM(QtyOut) FROM IN_StockDetail GROUP BY HeaderNo) AS D ON S.HeaderNo = D.HeaderNo
                  INNER JOIN (SELECT ItemCode, UOMCode, UOM, UnitQuantity FROM IN_Item) I ON I.ItemCode = S.ItemCode 
                  WHERE LocationCode = :LocationCode
                  GROUP BY LocationCode, S.ItemCode, Item, UOMCode, UOM, UnitQuantity, Location, ItemTrackBy`;

    let ItemData = await db[req.headers.compcode].sequelize.query(sQuery, {
      replacements: { LocationCode: req.query.LocationCode},
      type: db[req.headers.compcode].Sequelize.QueryTypes.SELECT,
    });

    let columns = ["ItemCode","Item","Location","ItemType","ItemTrackBy","Price","QtyBal"]
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

exports.getOpenIRs = async (req, res) => {
  try {

    let sqlQuery =  `SELECT H.TransNo, RLineSeq, D.ItemCode, D.Item, UOMCode, UOM, BaseQuantity, 
                      UnitQuantity = UnitQuantity - (UsedQuantity + CanceledQuantity),
                      Quantity,
                      AvailableQuantity = (UnitQuantity - (UsedQuantity + CanceledQuantity) / BaseQuantity),
                      StockQuantity = ISNULL(S.QtyBal,0)
                      FROM IN_RequisitionMaster H
                      INNER JOIN  IN_RequisitionDetail D ON H.TransNo = D.TransNo AND D.LineStatus = 0
                      LEFT OUTER JOIN vw_Stock S ON S.ItemCode = D.ItemCode AND H.LocationCode = S.LocationCode
                      WHERE H.SubmitStatus = 1 AND H.LocationCode = :LocationCode`;

    let OpenIRs = await db[req.headers.compcode].sequelize.query(sqlQuery,{replacements : {LocationCode : req.query.LocationCode},type : db[req.headers.compcode].Sequelize.QueryTypes.SELECT}) 

    ResponseLog.Send200(req, res, { OpenIRs: OpenIRs });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getOpenTransfers = async (req, res) => {
  try {

    let sqlQuery =  `SELECT H.TransNo, H.LocationCode, H.Location, TLineSeq, D.ItemCode, D.Item, ItemTrackBy, ItemType, 
                      UOMCode, UOM, 
                      UnitQuantity,
                      BaseQuantity, 
                      AvailableQuantity = Quantity,
                      UnitCost
                      FROM IN_TransferHeader H
                      INNER JOIN IN_TransferDetail D ON H.TransNo = D.TransNo AND D.LineStatus = 0
                      WHERE H.Posted = 1 AND H.DestinationLocationCode = :LocationCode  AND H.TransType = 'IXFR'`;

    let OpenTransfers = await db[req.headers.compcode].sequelize.query(sqlQuery,{replacements : {LocationCode : req.query.LocationCode},type : db[req.headers.compcode].Sequelize.QueryTypes.SELECT}) 

    ResponseLog.Send200(req, res, { OpenTransfers: OpenTransfers });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

