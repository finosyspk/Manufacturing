const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  let IN_StockMaster = sequelize.define('IN_StockMaster', {
    HeaderNo: {
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
    ExpiryDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "01-Jan-1900"
    },
    TransType: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "0"
    },
    TransNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    TransDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: new Date()
    },
    Quantity: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    UnitPrice: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    AvgCost: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    LineNo: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    QtySold: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    QtyAlloc: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    Status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

  }, {
    sequelize,
    tableName: 'IN_StockMaster',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__IN_Stock__DC210D6C2385A8BE",
        unique: true,
        fields: [
          { name: "HeaderNo" },
        ]
      },
    ]
  });

  IN_StockMaster.associate = function (models) {
    IN_StockMaster.hasMany(models.IN_StockAlloc, {
      targetKey: "HeaderNo",
      foreignKey: "HeaderNo",
    });
    IN_StockMaster.hasMany(models.IN_StockDetail, {
      targetKey: "HeaderNo",
      foreignKey: "HeaderNo",
    });
  }

  return IN_StockMaster;
};

