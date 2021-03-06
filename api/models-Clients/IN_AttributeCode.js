const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('INV_AttributeCode', {
    AttCodeID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    AttHeadID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'INV_AttributeHead',
        key: 'AttHeadID'
      }
    },
    AttHeadCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    AttHead: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    AttCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    AttValue: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'INV_AttributeCode',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__INV_Attri__D640D3FCACD1C6EE",
        unique: true,
        fields: [
          { name: "AttCodeID" },
        ]
      },
    ]
  });
};
