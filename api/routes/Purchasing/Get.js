const express = require("express");
const router = express.Router();
const controller = require("../../controllers/Purchasing/index");
const { CreateCompanyInstance } = require("../../midleware/company-instance");
const CheckAuth = require("../../midleware/validate-auth");

router.get("/", CheckAuth, CreateCompanyInstance, (req, res) => {
  console.log({ FormName: req.query.FormName });
  switch (req.query.FormName) {
      case "Requisition":
        controller.Requisition.getOne(req, res);
        break;
      case "PurchaseOrder":
        controller.PurchaseOrder.getOne(req, res);
        break;
      case "GoodsReceipt":
        controller.GoodsReceipt.getOne(req, res);
        break;
      case "PurchaseInvoice":
        controller.PurchaseInvoice.getOne(req, res);
        break;
      default:
        break;
  }
});

module.exports = router;
