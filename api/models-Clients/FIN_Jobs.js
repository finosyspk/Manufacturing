const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FIN_Jobs', {
    JobID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    JobCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      unique: "Jobs_JobCode_unique"
    },
    JobDesc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    PJobID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    JobLevel: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    JobHead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    JobUsed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    L1: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    L2: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    L3: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    L4: {
      type: DataTypes.STRING(255),
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
    UseCount: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'FIN_Jobs',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "Jobs_JobCode_unique",
        unique: true,
        fields: [
          { name: "JobCode" },
        ]
      },
      {
        name: "PK__FIN_Jobs__8FA9A8D9FBE0193B",
        unique: true,
        fields: [
          { name: "JobID" },
          { name: "JobCode" },
        ]
      },
    ]
  });
};
