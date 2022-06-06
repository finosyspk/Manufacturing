/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  var IN_StockMaster = sequelize.define('IN_StockMaster', {
    HeaderNo: {
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
    ExpiryDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: '01-Jan-1900'
    },
    BinNo: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    TransNature: {
      type: DataTypes.STRING,
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
    QtyIn: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    UnitPrice: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    Status: {
      type: DataTypes.BOOLEAN,
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
    AvgCost: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    QtyAlloc: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    }
  }, {
    timestamps: true,
    tableName: 'IN_StockMaster'
  });
  IN_StockMaster.associate = function (models) {
    IN_StockMaster.hasMany(models.IN_StockDetail, {
      onDelete: 'no action',
onUpdate: 'no action',
foreignKey: 'HeaderNo'
    }),
      IN_StockMaster.hasMany(models.IN_StockAlloc, {
        onDelete: 'no action',
onUpdate: 'no action',
foreignKey: 'HeaderNo'
      })
  };
  return IN_StockMaster
};
