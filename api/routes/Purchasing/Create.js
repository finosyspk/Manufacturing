const express = require("express");
const router = express.Router();
const controller = require("../../controllers/Purchasing/index");
const CheckAuth = require("../../midleware/validate-auth");

router.post("/", CheckAuth, (req, res) => {
  switch (req.query.FormName) {
    case "Requisition":
      controller.Requisition.CreateOrUpdate(req, res);
      break;
    case "PurchaseOrder":
      controller.PurchaseOrder.CreateOrUpdate(req, res);
      break;
    case "GoodsReceipt":
      controller.GoodsReceipt.CreateOrUpdate(req, res);
      break;
    case "PurchaseInvoice":
      controller.PurchaseInvoice.CreateOrUpdate(req, res);
      break;
    default:
      break;
}
});

module.exports = router;
