// const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");

exports.getList = async (req, res) => {
  try {
    let Columns = [
      "ItemCode",
      "Item",
      "Description",
      "ItemType",
      "ItemTrackBy",
      "IsActive",
    ];
    let Item = await SeqFunc.getAll(req.sequelizeDB.INV_Item, {}, true, Columns);
    if (Item.success) {
      ResponseLog.Send200(req, res, Item.Data);
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getOne = async (req, res) => {
  try {
    let Item = await SeqFunc.getOne(req.sequelizeDB.INV_Item, {
      where: { ItemCode: req.query.ItemCode },
    });

    if (Item.success) {
      let ItemUOM = await SeqFunc.getAll(
        req.sequelizeDB.INV_ItemUOM,
        { where: {ItemID: Item.Data.ItemID} },
        false,
        ["UOMCode","UOM", "IsActive", "QTYEQV"]
      );

      let ItemLocation = await SeqFunc.getAll(
        req.sequelizeDB.INV_ItemLocation,
        { where: {ItemID: Item.Data.ItemID} },
        false,
        ["LocationID", "ReOrderLevel", "MinQty", "MaxQty", "SafetyStock"]
      );
      let ItemAttributes = await SeqFunc.getAll(
        req.sequelizeDB.INV_ItemAttributes,
        { where: {ItemID: Item.Data.ItemID} },
        false,
        ["AttributeCode", "AttValue", "AttributeType", "IsVariant"]
      );

      console.log({ItemAttributes})

      let Data = {
        Header: Item.Data,
        UOM: ItemUOM.Data,
        Location: ItemLocation.Data,
        Attributes: ItemAttributes.Data,
      };

      ResponseLog.Send200(req, res, Data);
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    let ItemData = await SeqFunc.getOne(
      req.sequelizeDB.INV_Item,
      { where: { ItemCode: req.query.ItemCode } },
      Header
    );

    if (ItemData.success) {
      await SeqFunc.Delete(req.sequelizeDB.INV_ItemUOM, {
        where: { ItemCode: ItemData.Data.ItemCode },
      });
      await SeqFunc.Delete(req.sequelizeDB.INV_ItemLocation, {
        where: { ItemCode: ItemData.Data.ItemCode },
      });
      await SeqFunc.Delete(req.sequelizeDB.INV_ItemAttributes, {
        where: { ItemCode: ItemData.Data.ItemCode },
      });

      await SeqFunc.Delete(req.sequelizeDB.INV_Item, {
        where: { ItemCode: ItemData.Data.ItemCode },
      });
      ResponseLog.Delete200(req, res);
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.CreateOrUpdate = async (req, res) => {
  try {
    let Header = req.body.Header;
    let UOM = req.body.UOM;
    let Attributes = req.body.Attributes;
    delete Header.ItemID

    let ItemData = await SeqFunc.updateOrCreate(
      req.sequelizeDB.INV_Item,
      { where: { ItemCode: Header.ItemCode } },
      Header
    );

    if (ItemData.success) {
      await SeqFunc.Delete(req.sequelizeDB.INV_ItemUOM, {
        where: { ItemCode: ItemData.Data.ItemCode },
      });
      await SeqFunc.Delete(req.sequelizeDB.INV_ItemAttributes, {
        where: { ItemCode: ItemData.Data.ItemCode },
      });

      UOM.map(o => {
        delete o.ItemUOMID
        o.ItemID = ItemData.Data.ItemID
        o.ItemCode = ItemData.Data.ItemCode
        o.Item = ItemData.Data.Item
        o.IsActive = true
        return o
      })
      Attributes.map(o => {
        delete o.IAttID
        o.AttributeValue = o.AttValue
        o.ItemID = ItemData.Data.ItemID
        o.ItemCode = ItemData.Data.ItemCode
        o.Item = ItemData.Data.Item
        return o
      })
      await SeqFunc.bulkCreate(req.sequelizeDB.INV_ItemUOM, UOM);
      await SeqFunc.bulkCreate(req.sequelizeDB.INV_ItemAttributes, Attributes);

      if (ItemData.created) {
        ResponseLog.Create200(req, res);
      } else {
        ResponseLog.Update200(req, res);
      }
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};
