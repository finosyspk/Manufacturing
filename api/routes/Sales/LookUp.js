const express = require("express");
const router = express.Router();
const controller = require("../../controllers/Sales/index");
const { CreateCompanyInstance } = require("../../midleware/company-instance");
const CheckAuth = require("../../midleware/validate-auth");

router.get("/", CheckAuth, CreateCompanyInstance, (req, res) => {
  switch (req.query.FormName) {
    case "OpenSalesQuotes":
      controller.LookUp.getOpenSalesQuotes(req, res);
      break;
    case "OpenSalesOrders":
      controller.LookUp.getOpenSalesOrders(req, res);
      break;
    case "OpenSalesDispatches":
      controller.LookUp.getOpenSalesDispatches(req, res);
      break;
    default:
      break;
  }
});

module.exports = router;
