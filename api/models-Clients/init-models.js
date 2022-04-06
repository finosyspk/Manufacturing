var DataTypes = require("sequelize").DataTypes;
var _IN_AttributeCode = require("./IN_AttributeCode");
var _IN_AttributeHead = require("./IN_AttributeHead");
var _IN_Item = require("./IN_Item");
var _IN_ItemAttributes = require("./IN_ItemAttributes");
var _IN_ItemClass = require("./IN_ItemClass");
var _IN_ItemClassAttributes = require("./IN_ItemClassAttributes");
var _IN_ItemLocation = require("./IN_ItemLocation");
var _IN_ItemUOM = require("./IN_ItemUOM");
var _IN_Location = require("./IN_Location");
var _IN_Log = require("./IN_Log");
var _IN_NextNo = require("./IN_NextNo");
var _IN_StockAlloc = require("./IN_StockAlloc");
var _IN_StockDetail = require("./IN_StockDetail");
var _IN_StockMaster = require("./IN_StockMaster");
var _IN_TransferBatches = require("./IN_TransferBatches");
var _IN_TransferDetail = require("./IN_TransferDetail");
var _IN_TransferHeader = require("./IN_TransferHeader");
var _IN_UOMDetail = require("./IN_UOMDetail");
var _IN_UOMHeader = require("./IN_UOMHeader");
var _MOP_BOMDetail = require("./MOP_BOMDetail");
var _MOP_BOMHeader = require("./MOP_BOMHeader");
var _MOP_Issuance = require("./MOP_Issuance");
var _MOP_IssuanceDetail = require("./MOP_IssuanceDetail");
var _MOP_Log = require("./MOP_Log");
var _MOP_MODetail = require("./MOP_MODetail");
var _MOP_MOHeader = require("./MOP_MOHeader");
var _MOP_Machine = require("./MOP_Machine");
var _MOP_NextNo = require("./MOP_NextNo");
var _MOP_Receipt = require("./MOP_Receipt");
var _MOP_RoutingDetail = require("./MOP_RoutingDetail");
var _MOP_RoutingHeader = require("./MOP_RoutingHeader");
var _MOP_ShiftDetail = require("./MOP_ShiftDetail");
var _MOP_ShiftMaster = require("./MOP_ShiftMaster");
var _MOP_Stages = require("./MOP_Stages");
var _SequelizeMeta = require("./SequelizeMeta");

function initModels(sequelize) {
  var IN_AttributeCode = _IN_AttributeCode(sequelize, DataTypes);
  var IN_AttributeHead = _IN_AttributeHead(sequelize, DataTypes);
  var IN_Item = _IN_Item(sequelize, DataTypes);
  var IN_ItemAttributes = _IN_ItemAttributes(sequelize, DataTypes);
  var IN_ItemClass = _IN_ItemClass(sequelize, DataTypes);
  var IN_ItemClassAttributes = _IN_ItemClassAttributes(sequelize, DataTypes);
  var IN_ItemLocation = _IN_ItemLocation(sequelize, DataTypes);
  var IN_ItemUOM = _IN_ItemUOM(sequelize, DataTypes);
  var IN_Location = _IN_Location(sequelize, DataTypes);
  var IN_Log = _IN_Log(sequelize, DataTypes);
  var IN_NextNo = _IN_NextNo(sequelize, DataTypes);
  var IN_StockAlloc = _IN_StockAlloc(sequelize, DataTypes);
  var IN_StockDetail = _IN_StockDetail(sequelize, DataTypes);
  var IN_StockMaster = _IN_StockMaster(sequelize, DataTypes);
  var IN_TransferBatches = _IN_TransferBatches(sequelize, DataTypes);
  var IN_TransferDetail = _IN_TransferDetail(sequelize, DataTypes);
  var IN_TransferHeader = _IN_TransferHeader(sequelize, DataTypes);
  var IN_UOMDetail = _IN_UOMDetail(sequelize, DataTypes);
  var IN_UOMHeader = _IN_UOMHeader(sequelize, DataTypes);
  var MOP_BOMDetail = _MOP_BOMDetail(sequelize, DataTypes);
  var MOP_BOMHeader = _MOP_BOMHeader(sequelize, DataTypes);
  var MOP_Issuance = _MOP_Issuance(sequelize, DataTypes);
  var MOP_IssuanceDetail = _MOP_IssuanceDetail(sequelize, DataTypes);
  var MOP_Log = _MOP_Log(sequelize, DataTypes);
  var MOP_MODetail = _MOP_MODetail(sequelize, DataTypes);
  var MOP_MOHeader = _MOP_MOHeader(sequelize, DataTypes);
  var MOP_Machine = _MOP_Machine(sequelize, DataTypes);
  var MOP_NextNo = _MOP_NextNo(sequelize, DataTypes);
  var MOP_Receipt = _MOP_Receipt(sequelize, DataTypes);
  var MOP_RoutingDetail = _MOP_RoutingDetail(sequelize, DataTypes);
  var MOP_RoutingHeader = _MOP_RoutingHeader(sequelize, DataTypes);
  var MOP_ShiftDetail = _MOP_ShiftDetail(sequelize, DataTypes);
  var MOP_ShiftMaster = _MOP_ShiftMaster(sequelize, DataTypes);
  var MOP_Stages = _MOP_Stages(sequelize, DataTypes);
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);

  IN_Item.belongsToMany(IN_Location, { as: 'LocationID_IN_Locations', through: IN_ItemLocation, foreignKey: "ItemID", otherKey: "LocationID" });
  IN_Location.belongsToMany(IN_Item, { as: 'ItemID_IN_Items', through: IN_ItemLocation, foreignKey: "LocationID", otherKey: "ItemID" });
  IN_AttributeCode.belongsTo(IN_AttributeHead, { as: "IN_AttHead", foreignKey: "AttHeadID"});
  IN_AttributeHead.hasMany(IN_AttributeCode, { as: "IN_AttributeCodes", foreignKey: "AttHeadID"});
  IN_ItemClassAttributes.belongsTo(IN_AttributeHead, { as: "AttributeCode_IN_AttributeHead", foreignKey: "AttributeCode"});
  IN_AttributeHead.hasMany(IN_ItemClassAttributes, { as: "IN_ItemClassAttributes", foreignKey: "AttributeCode"});
  IN_ItemAttributes.belongsTo(IN_Item, { as: "Item", foreignKey: "ItemID"});
  IN_Item.hasMany(IN_ItemAttributes, { as: "IN_ItemAttributes", foreignKey: "ItemID"});
  IN_ItemLocation.belongsTo(IN_Item, { as: "Item", foreignKey: "ItemID"});
  IN_Item.hasMany(IN_ItemLocation, { as: "IN_ItemLocations", foreignKey: "ItemID"});
  IN_ItemUOM.belongsTo(IN_Item, { as: "IN_Item", foreignKey: "ItemID"});
  IN_Item.hasMany(IN_ItemUOM, { as: "IN_ItemUOMs", foreignKey: "ItemID"});
  IN_TransferDetail.belongsTo(IN_Item, { as: "Item", foreignKey: "ItemID"});
  IN_Item.hasMany(IN_TransferDetail, { as: "IN_TransferDetails", foreignKey: "ItemID"});
  IN_Item.belongsTo(IN_ItemClass, { as: "IN_ItemClass", foreignKey: "ItemClassID"});
  IN_ItemClass.hasMany(IN_Item, { as: "IN_Items", foreignKey: "ItemClassID"});
  IN_ItemClassAttributes.belongsTo(IN_ItemClass, { as: "ItemClass", foreignKey: "ItemClassID"});
  IN_ItemClass.hasMany(IN_ItemClassAttributes, { as: "IN_ItemClassAttributes", foreignKey: "ItemClassID"});
  IN_ItemLocation.belongsTo(IN_Location, { as: "Location", foreignKey: "LocationID"});
  IN_Location.hasMany(IN_ItemLocation, { as: "IN_ItemLocations", foreignKey: "LocationID"});
  IN_TransferHeader.belongsTo(IN_Location, { as: "Location", foreignKey: "LocationID"});
  IN_Location.hasMany(IN_TransferHeader, { as: "IN_TransferHeaders", foreignKey: "LocationID"});
  IN_TransferHeader.belongsTo(IN_Location, { as: "LocationIDTo_IN_Location", foreignKey: "LocationIDTo"});
  IN_Location.hasMany(IN_TransferHeader, { as: "LocationIDTo_IN_TransferHeaders", foreignKey: "LocationIDTo"});
  IN_TransferHeader.belongsTo(IN_Location, { as: "LocationIDDelivery_IN_Location", foreignKey: "LocationIDDelivery"});
  IN_Location.hasMany(IN_TransferHeader, { as: "LocationIDDelivery_IN_TransferHeaders", foreignKey: "LocationIDDelivery"});
  IN_StockAlloc.belongsTo(IN_StockMaster, { as: "HeaderNo_IN_StockMaster", foreignKey: "HeaderNo"});
  IN_StockMaster.hasMany(IN_StockAlloc, { as: "IN_StockAllocs", foreignKey: "HeaderNo"});
  IN_StockDetail.belongsTo(IN_StockMaster, { as: "HeaderNo_IN_StockMaster", foreignKey: "HeaderNo"});
  IN_StockMaster.hasMany(IN_StockDetail, { as: "IN_StockDetails", foreignKey: "HeaderNo"});
  IN_TransferBatches.belongsTo(IN_TransferHeader, { as: "TransNo_IN_TransferHeader", foreignKey: "TransNo"});
  IN_TransferHeader.hasMany(IN_TransferBatches, { as: "IN_TransferBatches", foreignKey: "TransNo"});
  IN_TransferDetail.belongsTo(IN_TransferHeader, { as: "TransNo_IN_TransferHeader", foreignKey: "TransNo"});
  IN_TransferHeader.hasMany(IN_TransferDetail, { as: "IN_TransferDetails", foreignKey: "TransNo"});

  return {
    IN_AttributeCode,
    IN_AttributeHead,
    IN_Item,
    IN_ItemAttributes,
    IN_ItemClass,
    IN_ItemClassAttributes,
    IN_ItemLocation,
    IN_ItemUOM,
    IN_Location,
    IN_Log,
    IN_NextNo,
    IN_StockAlloc,
    IN_StockDetail,
    IN_StockMaster,
    IN_TransferBatches,
    IN_TransferDetail,
    IN_TransferHeader,
    IN_UOMDetail,
    IN_UOMHeader,
    MOP_BOMDetail,
    MOP_BOMHeader,
    MOP_Issuance,
    MOP_IssuanceDetail,
    MOP_Log,
    MOP_MODetail,
    MOP_MOHeader,
    MOP_Machine,
    MOP_NextNo,
    MOP_Receipt,
    MOP_RoutingDetail,
    MOP_RoutingHeader,
    MOP_ShiftDetail,
    MOP_ShiftMaster,
    MOP_Stages,
    SequelizeMeta,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
