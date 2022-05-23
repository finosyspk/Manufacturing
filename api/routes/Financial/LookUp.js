const express = require("express");
const router = express.Router();
const controller = require("../../controllers/Financial/index");
const { CreateCompanyInstance } = require("../../midleware/company-instance");
const CheckAuth = require("../../midleware/validate-auth");

router.get("/", CheckAuth, CreateCompanyInstance, (req, res) => {
  switch (req.query.FormName) {
    case "Jobs":
      controller.LookUp.getJobs(req, res);
      break;
    case "TaxSchedule":
      controller.LookUp.getTaxSchedule(req, res);
      break;
    case "TaxDetail":
      controller.LookUp.getTaxDetail(req, res);
      break;
    case "Accounts":
      controller.LookUp.getAccounts(req, res);
      break;
    case "PayTerms":
      controller.LookUp.getPayTerms(req, res);
      break;
    case "SalesPersons":
      controller.LookUp.getSalesPersons(req, res);
      break;
    case "Customers":
      controller.LookUp.getCustomers(req, res);
      break;
    case "Currencies":
      controller.LookUp.getCurrencies(req, res);
      break;
    default:
      break;
  }
});

module.exports = router;
