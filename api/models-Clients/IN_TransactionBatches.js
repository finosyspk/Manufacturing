const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IN_TransactionBatches', {
    TRBID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    TLineSeq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'IN_TransactionDetail',
        key: 'TLineSeq'
      }
    },
    TransNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'IN_TransactionHeader',
        key: 'TransNo'
      }
    },
    BatchNo: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ExpiryDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: ""
    },
    Quantity: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    BaseQuantity: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'IN_TransactionBatches',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__IN_Transaction__CAFF4132026691CE",
        unique: true,
        fields: [
          { name: "TRBID" },
        ]
      },
    ]
  });
};
