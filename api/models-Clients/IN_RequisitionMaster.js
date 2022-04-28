/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  var INV_RequisitionMaster = sequelize.define('INV_RequisitionMaster', {
    RID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    LocationCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TransType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TransNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    TransDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: new Date()
    },
    RequiredDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: new Date()
    },
    TransTotal: {
      type: DataTypes.DECIMAL(20, 5),
      allowNull: false,
      defaultValue: 0
    },
    FiscalYearID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    Remarks: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    SubmitStatus: {
      type: 'bit',
      allowNull: false,
      defaultValue: 0
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    CreatedUser: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    ModifyUser: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },    
    PostedUser: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    postedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    PrdID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Period: {
      type: DataTypes.STRING,
      allowNull: true
    },
    YearID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    timestamps: true,
    tableName: 'INV_RequisitionMaster'
  });
  INV_RequisitionMaster.associate = function (models) {
    INV_RequisitionMaster.hasMany(models.INV_RequisitionDetail, {
      foreignKey: 'TransNo'
    })
  }
  return INV_RequisitionMaster
};
