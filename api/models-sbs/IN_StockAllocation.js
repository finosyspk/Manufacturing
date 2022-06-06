/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  var IN_StockAlloc = sequelize.define('IN_StockAlloc', {
    AllocNo: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    BranchCode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    LocationCode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    ItemCode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    BatchNo: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    BinNo: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    TransNature: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    TransNo: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    TransDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    Pieces: {
      type: DataTypes.DECIMAL(20, 5),
      allowNull: false,
      defaultValue: 0
    },
    ShipDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Container: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Vessel: {
      type: DataTypes.STRING,
      allowNull: true
    },
    BL: {
      type: DataTypes.STRING,
      allowNull: true
    },
    PcsLeg: {
      type: DataTypes.DECIMAL(20, 5),
      allowNull: true,
      defaultValue: 0
    },
    PcsShldr: {
      type: DataTypes.DECIMAL(20, 5),
      allowNull: true,
      defaultValue: 0
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
    }
  }, {
    timestamps: true,
    tableName: 'IN_StockAlloc'
  });
  IN_StockAlloc.associate = function (models) {
    IN_StockAlloc.belongsTo(models.IN_StockMaster, {
      onDelete: 'no action',
onUpdate: 'no action',
foreignKey: 'HeaderNo'
    })
  }
  return IN_StockAlloc
};
