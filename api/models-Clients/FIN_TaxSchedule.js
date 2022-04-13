/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  var FIN_TaxSchedule = sequelize.define('FIN_TaxSchedule', {
    RID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true
    },
    TaxScheduleCode: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    TaxSchedule: {
      type: DataTypes.STRING,
      allowNull: false
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
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
    UseCount:{
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    timestamps: true,
    tableName: 'FIN_TaxSchedule'
  });
  FIN_TaxSchedule.associate = function (models) {
    FIN_TaxSchedule.hasMany(models.FIN_TaxScheduleDetail, {
      foreignKey: 'TaxScheduleCode'
    })
  }
  return FIN_TaxSchedule;
};
