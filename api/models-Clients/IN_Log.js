const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IN_Log', {
    RID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    LocationCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    MachineName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    PhysicalAddress: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    UserID: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    LogDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "2022-03-10 17:15:05.496 +05:00"
    },
    LogTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "2022-03-10 17:15:05.496 +05:00"
    },
    LogEvent: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    Description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    Remarks: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'IN_Log',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__IN_Log__CAFF413208ADDD30",
        unique: true,
        fields: [
          { name: "RID" },
        ]
      },
    ]
  });
};
