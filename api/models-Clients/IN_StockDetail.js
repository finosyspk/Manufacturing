const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('INV_StockDetail', {
    DetailNo: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    RecordDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    HeaderNo: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    LocationCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    Location: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    ItemCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    Item: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    ItemTrackBy: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    BatchNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    TransType: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "0"
    },
    TransNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    TransDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    QtyOut: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    UnitCost: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    LineNo: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
  }, {
    sequelize,
    tableName: 'INV_StockDetail',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__INV_Stock__135C19163F4DA36E",
        unique: true,
        fields: [
          { name: "DetailNo" },
        ]
      },
    ]
  });
};
