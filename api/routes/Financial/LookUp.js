const express = require("express");
const router = express.Router();
const controller = require("../../controllers/Financial/index");
const CheckAuth = require("../../midleware/validate-auth");

router.get("/", CheckAuth, (req, res) => {
  switch (req.query.FormName) {
    case "TaxSchedule":
      controller.LookUp.getTaxSchedule(req, res);
      break;
    case "Accounts":
      controller.LookUp.getAccounts(req, res);
      break;
    default:
      break;
  }
});

module.exports = router;
