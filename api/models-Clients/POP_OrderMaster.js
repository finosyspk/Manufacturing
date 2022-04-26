const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('POP_OrderMaster', {
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
      primaryKey: true,
      unique: "UQ__POP_Orde__9E5D30C2DD39B328"
    },
    TransType: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    TransDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
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
    PaymentTermCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    PaymentTerm: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Terms: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    TransTotal: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    Discount: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    TaxAmount: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      defaultValue: 0
    },
    Total: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    TransTotal_Cur: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    Discount_Cur: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    TaxAmount_Cur: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    Total_Cur: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false
    },
    RefNo: {
      type: DataTypes.STRING(255),
      allowNull: false
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
    tableName: 'POP_OrderMaster',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__POP_Orde__9E5D30C3BB83AD64",
        unique: true,
        fields: [
          { name: "TransNo" },
        ]
      },
      {
        name: "UQ__POP_Orde__9E5D30C2DD39B328",
        unique: true,
        fields: [
          { name: "TransNo" },
        ]
      },
    ]
  });
};
