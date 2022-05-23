const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const MaterialData = require("../../../core/MaterialData");

exports.getOpenRequisitions = async (req, res) => {
  try {

    let sqlQuery =  `SELECT QTransNo=H.TransNo, QLineSeq, D.ItemCode, D.Item, D.ItemTrackBy, D.ItemType, UOMCode, UOM, UnitQuantity, 
                      BaseQuantity = BaseQuantity - (QtyUsed + QtyCanceled),
                      Quantity,
                      AvailableQuantity = BaseQuantity - (QtyUsed + QtyCanceled)
                      FROM SOP_QuoteMaster H
                      INNER JOIN SOP_QuoteDetail D ON H.TransNo = D.TransNo AND D.LineStatus = 0
                      WHERE H.SubmitStatus = 1 AND H.LocationCode = :LocationCode`;

    let OpenSalesQuotes = await req.sequelizeDB.sequelize.query(sqlQuery,{replacements : {LocationCode : req.query.LocationCode},type : req.sequelizeDB.Sequelize.QueryTypes.SELECT}) 
    let columns = [["QTransNo","TransNo"],"ItemCode","Item","UOM","AvailableQuantity"]
    let Data = await MaterialData.Register(OpenSalesQuotes,columns);
    
    ResponseLog.Send200(req, res, {
      OpenSalesQuotes: Data,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getOpenSalesOrders = async (req, res) => {
  try {

    let sqlQuery =  `SELECT OTransNo=H.TransNo, OLineSeq, D.ItemCode, D.Item, D.ItemTrackBy, D.ItemType, UOMCode, UOM, UnitQuantity, 
                      BaseQuantity = BaseQuantity - (QtyUsed + QtyCanceled),
                      Quantity,
                      AvailableQuantity = BaseQuantity - (QtyUsed + QtyCanceled)
                      FROM SOP_OrderMaster H
                      INNER JOIN SOP_OrderDetail D ON H.TransNo = D.TransNo AND D.LineStatus = 0
                      WHERE H.SubmitStatus = 1 AND H.LocationCode = :LocationCode`;

    let OpenSalesOrders = await req.sequelizeDB.sequelize.query(sqlQuery,{replacements : {LocationCode : req.query.LocationCode},type : req.sequelizeDB.Sequelize.QueryTypes.SELECT}) 
    let columns = [["OTransNo","TransNo"],"ItemCode","Item","UOM","AvailableQuantity"]
    let Data = await MaterialData.Register(OpenSalesOrders,columns);
    
    ResponseLog.Send200(req, res, {
      OpenSalesOrders: Data,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getOpenSalesDispatches = async (req, res) => {
  try {

    let sqlQuery =  `SELECT DTransNo=H.TransNo, DLineSeq, D.ItemCode, D.Item, D.ItemTrackBy, D.ItemType, UOMCode, UOM, UnitQuantity, 
                      BaseQuantity = BaseQuantity - (QtyUsed + QtyCanceled),
                      Quantity,
                      AvailableQuantity = BaseQuantity - (QtyUsed + QtyCanceled)
                      FROM SOP_DispatchMaster H
                      INNER JOIN SOP_DispatchDetail D ON H.TransNo = D.TransNo AND D.LineStatus = 0
                      WHERE H.Posted = 1 AND H.LocationCode = :LocationCode`;

    let OpenSalesDispatches = await req.sequelizeDB.sequelize.query(sqlQuery,{replacements : {LocationCode : req.query.LocationCode},type : req.sequelizeDB.Sequelize.QueryTypes.SELECT}) 
    let columns = ["DTransNo","ItemCode","Item","UOM","AvailableQuantity"]
    let Data = await MaterialData.Register(OpenSalesDispatches,columns);
    
    ResponseLog.Send200(req, res, {
      OpenSalesDispatches: Data,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

