const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IN_StockAlloc', {
    AllocNo: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    RecordDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "2021-01-02 06:51:13.441 +00:00"
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
      defaultValue: "2021-01-02 06:51:13.441 +00:00"
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
    tableName: 'IN_StockAlloc',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__IN_Stock__83750297BE85F304",
        unique: true,
        fields: [
          { name: "AllocNo" },
        ]
      },
    ]
  });
};
