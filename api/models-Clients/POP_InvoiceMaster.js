const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('POP_InvoiceMaster', {
    RID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true
    },
    LocationCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Location: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    TransNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    TransDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    TransType: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    VendorCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    Vendor: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    CurID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    CurCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    CurDesc: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ExchRate: {
      type: DataTypes.DECIMAL(18,5),
      allowNull: true,
      defaultValue: 0
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
    TransTotal_Cur: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    FreightAmount: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    FreightAmount_Cur: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    MiscAmount: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    MiscAmount_Cur: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    Discount: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    Discount_Cur: {
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
    },
    Total: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    Total_Cur: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    Posted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    PrdID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Period: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    YearID: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    PurRefNo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    PostedUser: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    postedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'POP_InvoiceMaster',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__PM_Invoi__9E5D30C3AAE069E9",
        unique: true,
        fields: [
          { name: "TransNo" },
        ]
      },
    ]
  });
};
