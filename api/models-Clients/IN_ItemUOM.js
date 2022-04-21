const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IN_ItemUOM', {
    ItemUOMID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true
    },
    ItemID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'IN_Item',
        key: 'ItemID'
      }
    },
    ItemCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Item: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    UOMDID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    UOMCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    UOM: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    UnitQuantity: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'IN_ItemUOM',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__IN_ItemU__CE59FF116BE047E7",
        unique: true,
        fields: [
          { name: "ItemID" },
          { name: "UOMDID" },
        ]
      },
    ]
  });
};
