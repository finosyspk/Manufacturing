const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IN_TransactionDetail', {
    TRID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true
    },
    TransNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
    },
    TLineSeq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ItemCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Item: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ItemTrackBy: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ItemType: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    UOMCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    UOM: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    UnitQuantity: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: false
    },
    Quantity: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: false
    },
    BaseQuantity: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: false
    },
    UnitCost: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    Amount: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    Remarks: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
  }, {
    sequelize,
    tableName: 'IN_TransactionDetail',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK_IN_TransactionDetail",
        unique: true,
        fields: [
          { name: "TransNo" },
          { name: "TLineSeq" },
        ]
      },
    ]
  });
};
