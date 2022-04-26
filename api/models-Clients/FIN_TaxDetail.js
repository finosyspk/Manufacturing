const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FIN_TaxDetail', {
    RID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true
    },
    TaxDetailID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    TaxDetail: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    TaxType: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    AcctCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    AcctDesc: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    TaxRate: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    CreatedUser: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "(N"
    },
    ModifyUser: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "(N"
    },
    UseCount: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'FIN_TaxDetail',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__FIN_TaxD__8D980DD8627DAF6D",
        unique: true,
        fields: [
          { name: "TaxDetailID" },
        ]
      },
    ]
  });
};
