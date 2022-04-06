const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MOP_MOHeader', {
    MOID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    TransNo: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    TransDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    TransType: {
      type: DataTypes.CHAR(10),
      allowNull: false
    },
    LocationCode: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Location: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ItemCode: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Item: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    UOMCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ""
    },
    UOM: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    RoutingCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ""
    },
    RoutingName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    TransStatus: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    UnitQuantity: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: false
    },
    Quantity: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: false
    },
    BaseQuantity: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: false
    },
    MOStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0
    },
    CreatedUser: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    PostedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "01-Jan-1900"
    },
    PostedUser: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ""
    },
    ModifyUser: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'MOP_MOHeader',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__MOP_MOHe__6DB3600046470022",
        unique: true,
        fields: [
          { name: "MOID" },
        ]
      },
    ]
  });
};
