const express = require("express");
const router = express.Router();
const controller = require("../../controllers/Inventory/index");
const CheckAuth = require("../../midleware/validate-auth");

router.get("/", CheckAuth, (req, res) => {
  console.log({ FormName: req.query.FormName });
  switch (req.query.FormName) {
    case "Items":
      console.log("There!");
      controller.LookUp.getItems(req, res);
      break;
    case "ItemUOM":
      controller.LookUp.getItemUOM(req, res);
      break;
    case "Locations":
      controller.LookUp.getLocations(req, res);
      break;
    case "UOMClass":
      controller.LookUp.getUOMClass(req, res);
      break;
    case "UOM":
      controller.LookUp.getUOM(req, res);
      break;
    case "AttributeHeads":
      controller.LookUp.getAttributeHeads(req, res);
      break;
    case "AttributeCodes":
      controller.LookUp.getAttributeCodes(req, res);
      break;
      case "ItemClass":
        controller.LookUp.getItemClass(req, res);
        break;
    default:
      break;
  }
});

module.exports = router;
