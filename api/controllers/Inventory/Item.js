const db = require("../../models-Clients/index");
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
    let Item = await SeqFunc.getAll(db[req.headers.compcode].IN_Item, {}, true, Columns);
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
    let Item = await SeqFunc.getOne(db[req.headers.compcode].IN_Item, {
      where: { ItemCode: req.query.ItemCode },
    });

    if (Item.success) {
      let ItemUOM = await SeqFunc.getAll(
        db[req.headers.compcode].IN_ItemUOM,
        { where: {ItemID: Item.Data.ItemID} },
        false,
        ["UOMDID", "IsActive", "QTYEQV"]
      );

      let ItemLocation = await SeqFunc.getAll(
        db[req.headers.compcode].IN_ItemLocation,
        { where: {ItemID: Item.Data.ItemID} },
        false,
        ["LocationID", "ReOrderLevel", "MinQty", "MaxQty", "SafetyStock"]
      );
      let ItemAttributes = await SeqFunc.getAll(
        db[req.headers.compcode].IN_ItemAttributes,
        { where: {ItemID: Item.Data.ItemID} },
        false,
        ["AttributeCode", "AttributeValue", "AttributeType", "IsVariant"]
      );

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
      db[req.headers.compcode].IN_Item,
      { where: { ItemCode: req.query.ItemCode } },
      Header
    );

    if (ItemData.success) {
      await SeqFunc.Delete(db[req.headers.compcode].IN_ItemUOM, {
        where: { ItemID: ItemData.Data.ItemID },
      });
      await SeqFunc.Delete(db[req.headers.compcode].IN_ItemLocation, {
        where: { ItemID: ItemData.Data.ItemID },
      });
      await SeqFunc.Delete(db[req.headers.compcode].IN_ItemAttributes, {
        where: { ItemID: ItemData.Data.ItemID },
      });

      await SeqFunc.Delete(db[req.headers.compcode].IN_Item, {
        where: { ItemID: ItemData.Data.ItemID },
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
    let Location = req.body.Location;
    let Attributes = req.body.Attributes;

    let ItemData = await SeqFunc.updateOrCreate(
      db[req.headers.compcode].IN_Item,
      { where: { ItemCode: req.query.ItemCode } },
      Header
    );

    if (ItemData.success) {
      await SeqFunc.Delete(db[req.headers.compcode].IN_ItemUOM, {
        where: { ItemID: ItemData.Data.ItemID },
      });
      await SeqFunc.Delete(db[req.headers.compcode].IN_ItemLocation, {
        where: { ItemID: ItemData.Data.ItemID },
      });
      await SeqFunc.Delete(db[req.headers.compcode].IN_ItemAttributes, {
        where: { ItemID: ItemData.Data.ItemID },
      });

      UOM.map((o) => (o.ItemID = ItemData.Data.ItemID));
      Location.map((o) => (o.ItemID = ItemData.Data.ItemID));
      Attributes.map((o) => (o.ItemID = ItemData.Data.ItemID));

      await SeqFunc.bulkCreate(db[req.headers.compcode].IN_ItemUOM, UOM);
      await SeqFunc.bulkCreate(db[req.headers.compcode].IN_ItemLocation, UOM);
      await SeqFunc.bulkCreate(db[req.headers.compcode].IN_ItemAttributes, Attributes);

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
