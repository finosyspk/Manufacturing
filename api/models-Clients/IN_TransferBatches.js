const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IN_TransferBatches', {
    TRBID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    TLineSeq: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TransNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'IN_TransferHeader',
        key: 'TransNo'
      }
    },
    BatchNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    ExpiryDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Qty: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    unitQty: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    ShipDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Vessel: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Container: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    BL: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'IN_TransferBatches',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__IN_Trans__CAFF4132026691CE",
        unique: true,
        fields: [
          { name: "TRBID" },
        ]
      },
    ]
  });
};
