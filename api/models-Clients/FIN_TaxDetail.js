/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  var FIN_TaxDetail = sequelize.define(
    "FIN_TaxDetail",
    {
      RID: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
      },
      TaxDetailCode: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      TaxDetail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      TaxType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      AcctCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      AcctDesc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      TaxableTax: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      TaxRate: {
        type: DataTypes.DECIMAL(20, 5),
        allowNull: false,
      },
      IsActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
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
      tableName: "FIN_TaxDetail",
    }
  );
  FIN_TaxDetail.associate = function (models) {
    FIN_TaxDetail.hasMany(models.FIN_TaxScheduleDetail, {
      foreignKey: "TaxDetailCode",
    });
  };
  return FIN_TaxDetail;
};
