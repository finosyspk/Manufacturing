const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SOP_OrderMaster', {
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
    CusPONo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    CustomerCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Customer: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    CusAddCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    CurID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CurCode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CurDesc: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ExchRate: {
      type: DataTypes.DECIMAL(18,5),
      allowNull: false
    },
    SalesPersonCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    SalesPerson: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    PaymentTermsCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    PaymentTerms: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    TransNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      unique: "UQ__RM_Order__C3907C75E7F48AC3"
    },
    TransType: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    TransDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    PromiseDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: new Date()
    },
    TransTotal: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    TransTotal_Cur: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    TaxAmount: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    TaxAmount_Cur: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    FreightAmount: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    FreightAmount_Cur: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    MiscAmount: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    MiscAmount_Cur: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    DiscAmount: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    DiscAmount_Cur: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    Total: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    Total_Cur: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    InternalRef: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    Remarks: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    SubmitStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    Status: {
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
      allowNull: true
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
      type: DataTypes.STRING(255),
      allowNull: true
    },
    YearID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'SOP_OrderMaster',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__RM_Order__C3907C7417673FC4",
        unique: true,
        fields: [
          { name: "TransNo" },
        ]
      },
      {
        name: "UQ__RM_Order__C3907C75E7F48AC3",
        unique: true,
        fields: [
          { name: "TransNo" },
        ]
      },
    ]
  });
};
