const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('INV_TransactionBatches', {
    TRBID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    TLineSeq: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TransNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
    tableName: 'INV_TransactionBatches',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__INV_Transaction__CAFF4132026691CE",
        unique: true,
        fields: [
          { name: "TRBID" },
        ]
      },
    ]
  });
};
