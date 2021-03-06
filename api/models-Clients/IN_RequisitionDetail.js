/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  var INV_RequisitionDetail = sequelize.define(
    "INV_RequisitionDetail",
    {
      RID: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      RLineSeq: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      TransNo: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      ItemCode: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      Item: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      ItemTrackBy: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      ItemType: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      UOMCode: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      UOM: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      UnitQuantity: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: false,
      },
      Quantity: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: false,
      },
      BaseQuantity: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: false,
      },
      Price: {
        type: DataTypes.DECIMAL(20, 5),
        allowNull: false,
        defaultValue: 0,
      },
      Amount: {
        type: DataTypes.DECIMAL(20, 5),
        allowNull: false,
        defaultValue: 0,
      },
      UsedQuantity: {
        type: DataTypes.DECIMAL(20, 5),
        allowNull: false,
        defaultValue: 0,
      },
      CanceledQuantity: {
        type: DataTypes.DECIMAL(20, 5),
        allowNull: false,
        defaultValue: 0,
      },
      Remarks: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      LineStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      tableName: "INV_RequisitionDetail",
    }
  );
  INV_RequisitionDetail.associate = function (models) {
    INV_RequisitionDetail.belongsTo(models.INV_RequisitionMaster, {
      foreignKey: "TransNo",
    });
  };
  return INV_RequisitionDetail;
};
