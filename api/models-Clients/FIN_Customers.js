const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FIN_Customers', {
    CustID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CustomerCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Customer: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Collector: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SalesPerson: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    OrderBooker: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PayTermID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PayTermCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    PayTerm: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    CustCatID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CustCatCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    CustCat: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ShipMID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ShipMCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ShipM: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    CustTerID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CustTerCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    CustTer: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    CurID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CurCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    CurName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    CurSymbol: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    FinChInterestRate: {
      type: DataTypes.DECIMAL(18,5),
      allowNull: false
    },
    MinInvValforFinCh: {
      type: DataTypes.DECIMAL(18,5),
      allowNull: false
    },
    CreditLimit: {
      type: DataTypes.DECIMAL(18,5),
      allowNull: false
    },
    WHTaxCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    AgBkID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    AgBkCode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    AgBk: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PriceLevel: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    RecAcctCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    FrgtAcctCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    DiscAcctCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    SaleAcctCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    RecAcctDesc: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    FrgtAcctDesc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    DiscAcctDesc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    SaleAcctDesc: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    NTNNo: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    STRegNo: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    CPID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CPCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    CP: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    BillToAdrID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    AllowDiscount: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    ChargeInterest: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    UseCount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CreatedUser: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ModifyUser: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'FIN_Customers',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__Customer__049E3A891DC805C4",
        unique: true,
        fields: [
          { name: "CustID" },
        ]
      },
    ]
  });
};
