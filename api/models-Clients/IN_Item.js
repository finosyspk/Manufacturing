const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('INV_Item', {
    ItemID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    ItemClassID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'INV_ItemClass',
        key: 'ItemClassID'
      }
    },
    ItemClassCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ItemClass: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ItemCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Item: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    Description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    TaxScheduleID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    TaxScheduleCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    TaxSchedule: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    ItemType: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    RetailPrice: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    TradePrice: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    SalesPrice: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    Tolerance: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    UOMClassCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    UOMClass: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    UOMCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    UOM: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    UnitQuantity: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: true,
      defaultValue: ""
    },
    ItemTrackBy: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ItemDiscountPercent: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    ItemDiscountAmount: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    Inventory_GLCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    COGS_GLCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    Expense_GLCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    Revenue_GLCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    SalesTax_GLCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    BarCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    WarrantyDesc: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    WarrantyDays: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    WarrantyDueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: '01-01-1900'
    },
    ImagePath: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    Remarks: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    RequisitionMinQty: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 1
    },
    RequisitionMaxQty: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 99999
    },
    IsEnforcedReqQty: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    OrderMinQty: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 1
    },
    OrderMaxQty: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 99999
    },
    IsEnforcedOrderQty: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    LSTPPRICE: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    CreatedUser: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    ModifyUser: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    UseCount: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'INV_Item',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__INV_Item__727E83EB03953831",
        unique: true,
        fields: [
          { name: "ItemID" },
        ]
      },
    ]
  });
};
