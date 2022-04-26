const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('POP_InvoiceTaxes', {
    RID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    TransNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    ILineSeq: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    ItemCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    Item: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    TaxScheduleID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    TaxScheduleCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    TaxSchedule: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    TaxDetailID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
      references: {
        model: 'FIN_TaxDetail',
        key: 'TaxDetailID'
      }
    },
    TaxDetailCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    TaxDetail: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    TaxRate: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    TaxAmount: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    TaxAmount_Cur: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'POP_InvoiceTaxes',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__POP_Invo__CAFF4132F8D1ABE6",
        unique: true,
        fields: [
          { name: "RID" },
        ]
      },
    ]
  });
};
