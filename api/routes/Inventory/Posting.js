const express = require("express");
const router = express.Router();
const PostRequisition = require("../../controllers/Inventory/PostRequisition");
const PostAdjustment = require("../../controllers/Inventory/PostAdjustment");
const PostTransfer = require("../../controllers/Inventory/PostTransfer");
const PostReceiving = require("../../controllers/Inventory/PostReceiving");
const CheckAuth = require("../../midleware/validate-auth");
const { CreateCompanyInstance } = require("../../midleware/company-instance");

router.post("/", CheckAuth, CreateCompanyInstance, (req, res) => {
  console.log({ FormName: req.query });
  switch (req.query.FormName) {
    case "Requisitions":
      PostRequisition.postData(req, res);
      break;
    case "Transfers":
      PostTransfer.postData(req, res);
      break;
    case "Adjustments":
      PostAdjustment.postData(req, res);
      break;
    case "Receivings":
      PostReceiving.postData(req, res);
      break;
    default:
      break;
  }
});

module.exports = router;
