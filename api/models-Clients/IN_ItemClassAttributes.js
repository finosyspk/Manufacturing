const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IN_ItemClassAttributes', {
    IAttID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ItemClassID: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    ItemClassCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ItemClass: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    AttributeCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
      references: {
        model: 'IN_AttributeHead',
        key: 'AttHeadCode'
      }
    },
    AttributeType: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    IsVariant: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'IN_ItemClassAttributes',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__ItemClas__8CD26D65CE92E3F3",
        unique: true,
        fields: [
          { name: "IAttID" },
        ]
      },
    ]
  });
};
