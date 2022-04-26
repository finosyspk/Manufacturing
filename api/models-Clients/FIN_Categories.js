const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FIN_Categories', {
    CatID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    CatCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    CatDesc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    CreatedUser: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    ModifyUser: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    UseCount: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'FIN_Categories',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__Categori__6A1C8ADACFA959C1",
        unique: true,
        fields: [
          { name: "CatID" },
        ]
      },
    ]
  });
};
