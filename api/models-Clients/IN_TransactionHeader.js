const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('INV_TransactionHeader', {
    TRID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true
    },
    LocationCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    TransNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      unique: "UQ__INV_Transaction__9E5D30C2FCA25716"
    },
    TransDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    TransType: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    FormType: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    SrcTransNo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    TransTotal: {
      type: DataTypes.DECIMAL(20, 5),
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
    ModifyUser: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    PostedUser: {
      type: DataTypes.STRING(255),
      allowNull: true,
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
      type: DataTypes.STRING,
      allowNull: true
    },
    YearID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'INV_TransactionHeader',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__INV_Transaction__9E5D30C33A977B2F",
        unique: true,
        fields: [
          { name: "TransNo" },
        ]
      },
    ]
  });
};
