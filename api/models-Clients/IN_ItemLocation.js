const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IN_ItemLocation', {
    ItemLocID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true
    },
    LocationID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'IN_Location',
        key: 'LocationID'
      }
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
    ReOrderLevel: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    MinQty: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    MaxQty: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    SafetyStock: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'IN_ItemLocation',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__IN_ItemL__40D94C49902BB8B5",
        unique: true,
        fields: [
          { name: "LocationID" },
          { name: "ItemID" },
        ]
      },
    ]
  });
};
