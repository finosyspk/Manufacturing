const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('POP_RequisitionDetail', {
    RID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    RLineSeq: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    TransNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
      primaryKey: true
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
    BaseWuantity: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    Price: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    Amount: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    Amount_Cur: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    QtyUsed: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
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
    tableName: 'POP_RequisitionDetail',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__POP_Requ__E31A923EEF0A7279",
        unique: true,
        fields: [
          { name: "RID" },
          { name: "TransNo" },
        ]
      },
    ]
  });
};
