const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MOP_MODetail', {
    MOLineID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    MOID: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    CItemCode: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    CItemName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    UOMCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    UOM: {
      type: DataTypes.STRING,
      allowNull: true
    },
    UnitQuantity: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: false
    },
    Quantity: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: false
    },
    BaseQuantity: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: false
    },
    StageCode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    StageName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    StageSeq: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    MachineCode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    MachineName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    PowerCost: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: false,
      defaultValue: 0
    },
    LaborCost: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: false,
      defaultValue: 0
    },
    Output: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: false,
      defaultValue: 0
    },
    CycleTime: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: false,
      defaultValue: 0
    },
    Completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'MOP_MODetail',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__MOP_MODe__5A23838182B43909",
        unique: true,
        fields: [
          { name: "MOLineID" },
        ]
      },
    ]
  });
};
