// const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");
const MaterialData = require("../../../core/MaterialData");



exports.getLocations = async (req, res) => {
  try {
    let Columns = [];

    const sQuery = `SELECT * FROM SBS_COASTAL..IN_Location
    WHERE IsActive = 1 AND IsTransit = 0`

    let Location = await req.sequelizeDB.sequelize.query(sQuery, {
      type: req.sequelizeDB.Sequelize.QueryTypes.SELECT,
    });

    Columns = ["LocationCode", "Location"];
    let Data = await MaterialData.Register(Location, Columns);

    ResponseLog.Send200(req, res, {
      Location: Data,
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
    let Location = await SeqFunc.getAll(req.sequelizeDB.INV_Location, {where :{IsActive:true, IsTransit: true}}, true, Columns);

    
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
    let sQuery = `SELECT S.ItemCode, I.Item, UOMCode, UOM, UnitQuantity, S.LocationCode, Location, ItemType='Inventoried Item', ItemTrackBy, Price = AVG(UnitPrice), QtyIn = SUM(QtyIn), 
        QtyAlloc = SUM(ISNULL(A.QtyOut,0)), QtyOut = SUM(ISNULL(D.QtyOut,0)), QtyBal = SUM(QtyIn) - (SUM(ISNULL(A.QtyOut,0)) + SUM(ISNULL(D.QtyOut,0)))
        FROM SBS_COASTAL..IN_StockMaster S
        LEFT OUTER JOIN (SELECT HeaderNo, QtyOut = SUM(QtyOut) FROM SBS_COASTAL..IN_StockAlloc GROUP BY HeaderNo) AS A ON S.HeaderNo = A.HeaderNo
        LEFT OUTER JOIN (SELECT HeaderNo, QtyOut = SUM(QtyOut) FROM SBS_COASTAL..IN_StockDetail GROUP BY HeaderNo) AS D ON S.HeaderNo = D.HeaderNo
        INNER JOIN (SELECT I.ItemCode, Item, ItemTrackBy, IU.UOMCode, UOM, QTYEQV AS UnitQuantity FROM SBS_COASTAL..IN_Item I
				INNER JOIN SBS_COASTAL..IN_ItemUOM IU ON I.ItemCode = IU.ItemCode
				INNER JOIN SBS_COASTAL..IN_UOMDetail U ON U.UOMCode = IU.UOMCode) I ON I.ItemCode = S.ItemCode
	      INNER JOIN (SELECT LocationCode, Location FROM SBS_COASTAL..IN_Location) L ON L.LocationCode = S.LocationCode AND L.LocationCode = :LocationCode
        GROUP BY S.LocationCode, S.ItemCode, I.Item, UOMCode, UOM, UnitQuantity, Location, ItemTrackBy`;

    let ItemData = await req.sequelizeDB.sequelize.query(sQuery, {
      replacements: { LocationCode: req.query.LocationCode },
      type: req.sequelizeDB.Sequelize.QueryTypes.SELECT,
    });

    let columns = ["ItemCode", "Item", "Location", "ItemType", "ItemTrackBy", "Price", "QtyBal"]
    let Data = await MaterialData.Register(ItemData, columns);

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
    // let Columns = [];
    // let params = req.query.ItemType ? { ItemType : req.query.ItemType } : {}

    // Columns = ["ItemCode", "Item", "ItemType"];
    // let Item = await SeqFunc.getAll(req.sequelizeDB.INV_Item, { where : params}, true, Columns);

    
    // ResponseLog.Send200(req, res, {
    //   Item: Item.Data,
    // });

    let sQuery = `SELECT I.*, UOM_Base = U.UOM FROM SBS_COASTAL..IN_Item I INNER JOIN SBS_COASTAL..IN_UOMDetail U on I.UOM_BaseCode = U.UOMCode`;

    let ItemData = await req.sequelizeDB.sequelize.query(sQuery, {
      type: req.sequelizeDB.Sequelize.QueryTypes.SELECT,
    });

    let columns = ["ItemCode", "Item", "ItemType"]
    let Data = await MaterialData.Register(ItemData, columns);

    ResponseLog.Send200(req, res, {
      Item: Data,
    });

  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getItemUOM = async (req, res) => {
  try {

    // let Columns = [];

    // Columns = ["UOMCode","UOM","UnitQuantity"];
    // let ItemUOM = await SeqFunc.getAll(req.sequelizeDB.INV_ItemUOM, {where: { ItemCode: req.query.ItemCode, IsActive: 1 }}, true, Columns);
    // ResponseLog.Send200(req, res, {
    //   ItemUOM: ItemUOM.Data,
    // });

    let sQuery = `SELECT I.*, U.UOM, UnitQuantity = QTYEQV FROM SBS_COASTAL..IN_ItemUOM I
    INNER JOIN SBS_COASTAL..IN_UOMDetail U on I.UOMCode = U.UOMCode
    WHERE ItemCode = '${req.query.ItemCode}' AND I.IsActive = 1`;

    let ItemUOM = await req.sequelizeDB.sequelize.query(sQuery, {
      type: req.sequelizeDB.Sequelize.QueryTypes.SELECT,
    });

    let columns = ["UOMCode","UOM","UnitQuantity"]
    let Data = await MaterialData.Register(ItemUOM, columns);

    ResponseLog.Send200(req, res, {
      ItemUOM: Data,
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
    let UOMClass = await SeqFunc.getAll(req.sequelizeDB.INV_UOMHeader, {where :{IsActive:true}}, true, Columns);
    
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

    const sQuery = 'SELECT * FROM SBS_COASTAL..IN_UOMDetail WHERE UOMClassCode = :UOMHeaderCode AND IsActive = 1'
    let ItemData = await req.sequelizeDB.sequelize.query(sQuery, {
      type: req.sequelizeDB.Sequelize.QueryTypes.SELECT,
      replacements : {UOMHeaderCode : req.query.UOMHeaderCode} 
    });

    Columns = ["UOMCode", "UOM"];
    let Data = await MaterialData.Register(ItemData, Columns);


    ResponseLog.Send200(req, res, {
      UOMClass: Data,
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
    let AttributeHead = await SeqFunc.getAll(req.sequelizeDB.INV_AttributeHead, {where :{IsActive:true}}, true, Columns);
    
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
    let AttributeCode = await SeqFunc.getAll(req.sequelizeDB.INV_AttributeCode, {where :{AttHeadCode: req.query.AttHeadCode}}, true, Columns);
    
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
    let ItemClass = await SeqFunc.getAll(req.sequelizeDB.INV_ItemClass, {where :{IsActive: 1}}, true, Columns);
    
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
    let ItemClass = await SeqFunc.getAll(req.sequelizeDB.INV_ItemClassAttributes, {where :{ItemClassCode: req.query.ItemClassCode}}, false, Columns);
    
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

    let sqlQuery =  `SELECT RTransNo=H.TransNo, RLineSeq, D.ItemCode, D.Item, D.ItemTrackBy, D.ItemType, UOMCode, UOM, UnitQuantity, 
                      BaseQuantity = UnitQuantity - (UsedQuantity + CanceledQuantity),
                      Quantity,
                      AvailableQuantity = BaseQuantity - (UsedQuantity + CanceledQuantity),
                      StockQuantity = dbo.GetInventoryStock(D.ItemCode,'${req.query.LocationCode}')
                      FROM INV_RequisitionMaster H
                      INNER JOIN  INV_RequisitionDetail D ON H.TransNo = D.TransNo AND D.LineStatus = 0
                      LEFT OUTER JOIN vw_Stock S ON S.ItemCode = D.ItemCode AND H.LocationCode = S.LocationCode
                      WHERE H.SubmitStatus = 1 AND H.LocationCode = :LocationCode`;

    let OpenIRs = await req.sequelizeDB.sequelize.query(sqlQuery,{replacements : {LocationCode : req.query.LocationCode},type : req.sequelizeDB.Sequelize.QueryTypes.SELECT}) 
    let columns = ["RTransNo","ItemCode","Item","UOM","AvailableQuantity","StockQuantity"]
    let Data = await MaterialData.Register(OpenIRs,columns);
    
    ResponseLog.Send200(req, res, {
      OpenIRs: Data,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getOpenTransfers = async (req, res) => {
  try {

    let sqlQuery =  `SELECT TransNo = H.TransNo, H.LocationCode, H.Location, TLineSeq, D.ItemCode, D.Item, ItemTrackBy, ItemType, 
                      UOMCode, UOM, 
                      UnitQuantity,
                      BaseQuantity, 
                      Quantity = Quantity,
                      AvailableQuantity = Quantity,
                      UnitCost,
                      D.RTransNo,
                      D.RLineSeq
                      FROM INV_TransferHeader H
                      INNER JOIN INV_TransferDetail D ON H.TransNo = D.TransNo AND D.LineStatus = 0
                      WHERE H.Posted = 1 AND H.DestinationLocationCode = :LocationCode  AND H.TransType = 'IXFR'`;

    let OpenTransfers = await req.sequelizeDB.sequelize.query(sqlQuery,{replacements : {LocationCode : req.query.LocationCode},type : req.sequelizeDB.Sequelize.QueryTypes.SELECT}) 

    ResponseLog.Send200(req, res, { OpenTransfers: OpenTransfers });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

