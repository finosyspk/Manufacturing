const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IN_TransferHeader', {
    TRHID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true
    },
    LocationCode: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    Location: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    TransNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      unique: "UQ__IN_Trans__9E5D30C2FCA25716"
    },
    TransDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    TransType: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ViaLocationCode: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    ViaLocation: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    DestinationLocationCode: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    DestinationLocation: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    TransTotal: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    Posted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    Remarks: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    CreatedUser: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    PostedUser: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    ModifyUser: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    TransferTransNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    postedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    PrdID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Period: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    YearID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'IN_TransferHeader',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__IN_Trans__9E5D30C33A977B2F",
        unique: true,
        fields: [
          { name: "TransNo" },
        ]
      },
      {
        name: "UQ__IN_Trans__9E5D30C2FCA25716",
        unique: true,
        fields: [
          { name: "TransNo" },
        ]
      },
    ]
  });
};
