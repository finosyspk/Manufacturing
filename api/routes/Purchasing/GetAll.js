const express = require("express");
const router = express.Router();
const controller = require("../../controllers/Purchasing/index");
const CheckAuth = require("../../midleware/validate-auth");

router.get("/", CheckAuth,(req, res) => {
  console.log("Form : ", req.query.FormName);
  switch (req.query.FormName) {
    case "Requisition":
      controller.Requisition.getList(req, res);
      break;
    case "PurchaseOrder":
      controller.PurchaseOrder.getList(req, res);
      break;
    case "GoodsReceipt":
      controller.GoodsReceipt.getList(req, res);
      break;
    case "PurchaseInvoice":
      controller.PurchaseInvoice.getList(req, res);
      break;
    default:
      break;
  }
});

module.exports = router;
