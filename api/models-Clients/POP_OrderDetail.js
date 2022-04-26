const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('POP_OrderDetail', {
    RID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true
    },
    TransNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
      primaryKey: true,
      references: {
        model: 'POP_OrderMaster',
        key: 'TransNo'
      }
    },
    OLineSeq: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    RTransNo: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    RLineSeq: {
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
    Quantity: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    BaseQuantity: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    Price: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    TransTotal: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    TransTotal_Cur: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
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
      allowNull: false,
      defaultValue: 0
    },
    QtyUsed: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    QtyCanceled: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    Remarks: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    LineStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'POP_OrderDetail',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__POP_Orde__44153E89B38C9448",
        unique: true,
        fields: [
          { name: "OLineSeq" },
          { name: "TransNo" },
        ]
      },
    ]
  });
};
