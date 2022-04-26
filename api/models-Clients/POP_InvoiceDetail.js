const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('POP_InvoiceDetail', {
    RID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    TransNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
      references: {
        model: 'POP_InvoiceMaster',
        key: 'TransNo'
      }
    },
    ILineSeq: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    GTransNo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    GLineSeq: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    ItemCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    Item: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ItemTrackBy: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ItemType: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    JobCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    JobDesc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    UOMCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    UOM: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    UnitQuantity: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    Price: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    Quantity: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    BaseQuantity: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    Amount: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    Amount_Cur: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    TaxScheduleID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    TaxScheduleCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    TaxSchedule: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    TaxAmount: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    TaxAmount_Cur: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    Remarks: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'POP_InvoiceDetail',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__PM_Invoi__CAFF413296ACFB97",
        unique: true,
        fields: [
          { name: "RID" },
        ]
      },
    ]
  });
};
