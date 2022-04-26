const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FIN_Seg1', {
    VSID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    VSCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "UQ__FIN_Seg1__4E3519604C30BFD7"
    },
    VSDesc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    PVSID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    VSLevel: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    VSHead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    ResCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    VSUsed: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
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
    tableName: 'FIN_Seg1',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__FIN_Seg1__421D64623A236A4B",
        unique: true,
        fields: [
          { name: "VSID" },
        ]
      },
      {
        name: "UQ__FIN_Seg1__4E3519604C30BFD7",
        unique: true,
        fields: [
          { name: "VSCode" },
        ]
      },
    ]
  });
};
