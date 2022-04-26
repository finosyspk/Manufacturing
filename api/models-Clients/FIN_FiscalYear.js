const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FIN_FiscalYear', {
    RID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true
    },
    YearID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    StartDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    EndDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Closed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
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
    tableName: 'FIN_FiscalYear',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__FIN_Fisc__C33A18ADB7C8F80F",
        unique: true,
        fields: [
          { name: "YearID" },
        ]
      },
    ]
  });
};
