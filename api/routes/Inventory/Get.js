const express = require("express");
const router = express.Router();
const controller = require("../../controllers/Inventory/index");
const CheckAuth = require("../../midleware/validate-auth");

router.get("/", CheckAuth, (req, res) => {
  console.log({ FormName: req.query.FormName });
  switch (req.query.FormName) {
    case "Item":
      controller.Item.getOne(req, res);
      break;
    case "Attributes":
      controller.Attributes.getOne(req, res);
      break;
    case "ItemClass":
      controller.ItemClass.getOne(req, res);
      break;
    case "UOM":
      controller.UOM.getOne(req, res);
      break;
    case "Locations":
      controller.Locations.getOne(req, res);
      break;
    default:
      break;
  }
});

module.exports = router;