const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IN_AttributeHead', {
    AttHeadID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    AttHeadCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "IX_IN_AttributeHead"
    },
    AttHead: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
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
    tableName: 'IN_AttributeHead',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_IN_AttributeHead",
        unique: true,
        fields: [
          { name: "AttHeadCode" },
        ]
      },
      {
        name: "PK__IN_Attri__755F7027728014BC",
        unique: true,
        fields: [
          { name: "AttHeadID" },
        ]
      },
    ]
  });
};
