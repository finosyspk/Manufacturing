const express = require("express");
const router = express.Router();
const controller = require("../../controllers/Sales/index");
const CheckAuth = require("../../midleware/validate-auth");

router.post("/", CheckAuth, (req, res) => {
  switch (req.body.FormName) {
    case "SalesQuote":
      controller.SalesQuote.getOne(req, res);
      break;
    case "SalesOrder":
      controller.SalesOrder.getOne(req, res);
      break;
    case "SalesDispatch":
      controller.SalesDispatch.getOne(req, res);
      break;
    case "SalesInvoice":
      controller.SalesInvoice.getOne(req, res);
      break;
    default:
      break;
  }
});

module.exports = router;
