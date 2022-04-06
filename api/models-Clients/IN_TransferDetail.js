const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IN_TransferDetail', {
    TRDID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true
    },
    TransNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'IN_TransferHeader',
        key: 'TransNo'
      }
    },
    TLineSeq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    RequisitionNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    ItemID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'IN_Item',
        key: 'ItemID'
      }
    },
    ItemTrackBy: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    UOMCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    QtyIssued: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    QtyReceived: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    unitQtyIssued: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    unitQtyReceived: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    UnitCost: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    RequestedQty: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    Price: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    Amount: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    QtyUsed: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    Remarks: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    SrcTNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    SrcTLineSeq: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    LineStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    RLineSeq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'IN_TransferDetail',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK_IN_TransferDetail",
        unique: true,
        fields: [
          { name: "TransNo" },
          { name: "TLineSeq" },
        ]
      },
    ]
  });
};
