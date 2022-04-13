/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  var FIN_TaxScheduleDetail = sequelize.define(
    "FIN_TaxScheduleDetail",
    {
      RID: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
      },
      TaxScheduleCode: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      TaxDetailCode: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      CreatedUser: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      ModifyUser: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      UseCount: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      tableName: "FIN_TaxScheduleDetail",
    }
  );
  FIN_TaxScheduleDetail.associate = function (models) {
    FIN_TaxScheduleDetail.belongsTo(models.FIN_TaxDetail, {
      foreignKey: "TaxDetailCode",
    });
    FIN_TaxScheduleDetail.belongsTo(models.FIN_TaxSchedule, {
      foreignKey: "TaxScheduleCode",
    });
  };
  return FIN_TaxScheduleDetail;
};
