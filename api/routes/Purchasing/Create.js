const express = require("express");
const router = express.Router();
const controller = require("../../controllers/Purchasing/index");
const CheckAuth = require("../../midleware/validate-auth");

router.post("/", CheckAuth, (req, res) => {
  switch (req.query.FormName) {
    case "Requisitions":
      controller.Requisition.CreateOrUpdate(req, res);
      break;
    case "PurchaseOrder":
      controller.PurchaseOrder.CreateOrUpdate(req, res);
      break;
    case "GoodsReceipt":
      controller.GoodsReceipt.CreateOrUpdate(req, res);
      break;
      case "PurchaseInvoices":
        controller.PurchaseInvoice.CreateOrUpdate(req, res);
        break;
      case "BOM":
        controller.BOM.CreateOrUpdate(req, res);
        break;
    default:
      break;
  }
});

module.exports = router;
