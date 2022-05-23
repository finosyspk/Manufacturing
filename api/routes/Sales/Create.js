const express = require("express");
const router = express.Router();
const controller = require("../../controllers/Sales/index");
const { CreateCompanyInstance } = require("../../midleware/company-instance");
const CheckAuth = require("../../midleware/validate-auth");

router.post("/", CheckAuth, CreateCompanyInstance, (req, res) => {
  switch (req.body.FormName) {
    case "SalesQuote":
      controller.SalesQuote.CreateOrUpdate(req, res);
      break;
    case "SalesOrder":
      controller.SalesOrder.CreateOrUpdate(req, res);
      break;
    case "SalesDispatch":
      controller.SalesDispatch.CreateOrUpdate(req, res);
      break;
    case "SalesInvoice":
      controller.SalesInvoice.CreateOrUpdate(req, res);
      break;
    default:
      break;
  }
});

module.exports = router;
