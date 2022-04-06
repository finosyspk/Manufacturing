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
      references: {
        model: 'IN_StockMaster',
        key: 'HeaderNo'
      }
    },
    BranchCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    LocationID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    ItemCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    BatchNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    TransNature: {
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
    Pieces: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    ShipDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Vessel: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Container: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    BL: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    PcsLeg: {
      type: DataTypes.DECIMAL(19,5),
      allowNull: true
    },
    PcsShldr: {
      type: DataTypes.DECIMAL(19,5),
      allowNull: true
    }
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
