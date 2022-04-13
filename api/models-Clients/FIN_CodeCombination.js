/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  var FIN_CodeCombination = sequelize.define(
    "FIN_CodeCombination",
    {
      AcctCode: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      AcctDesc: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      S1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      S1L1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      S1L2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      S2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      S2L1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      S2L2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      S3: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      S3L1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      S3L2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      S3L3: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      S3L4: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      S3L5: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      AcctType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      TypBal: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      OpBal: {
        type: DataTypes.DECIMAL(18, 5),
        allowNull: true,
        defaultValue: 0,
      },
      CrBal: {
        type: DataTypes.DECIMAL(18, 5),
        allowNull: true,
        defaultValue: 0,
      },
      Enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
      },
      CB: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      Control: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      UseCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      AcctAlias: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      CreatedUser: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      ModifyUser: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
    },
    {
      tableName: "FIN_CodeCombination",
    }
  );
  // CodeCombination.associate = function (models) {
  //   CodeCombination.hasMany(models.Lines, {
  //     onDelete: 'no action',
  //     onUpdate: 'no action',
  //     foreignKey: "AcctCode",
  //   }),
  //     CodeCombination.belongsTo(models.Seg1, {
  //       onDelete: 'no action',
  //       onUpdate: 'no action',
  //       foreignKey: "S1",
  //       targetKey: "VSCode",
  //     }),
  //     CodeCombination.belongsTo(models.Seg2, {
  //       onDelete: 'no action',
  //       onUpdate: 'no action',
  //       foreignKey: "S2",
  //       targetKey: "VSCode",
  //     }),
  //     CodeCombination.belongsTo(models.Seg3, {
  //       onDelete: 'no action',
  //       onUpdate: 'no action',
  //       foreignKey: "S3",
  //       targetKey: "VSCode",
  //     });
  //     // FOR CREATED AND MODIFIED USER
  //     CodeCombination.belongsTo(models.SC_Users, {
  //       as: 'CU',
  //       foreignKey: 'CreatedUser',
  //       targetKey: 'UserID',
  //     })
  //     CodeCombination.belongsTo(models.SC_Users, {
  //       as: 'MU',
  //       foreignKey: 'ModifyUser',
  //       targetKey: 'UserID',
  //     })
  //     // FOR CREATED AND MODIFIED USER
  // };

  return FIN_CodeCombination;
};
