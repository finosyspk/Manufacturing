const express = require("express");
const router = express.Router();
const controller = require("../../controllers/Manufacturing/index");
const CheckAuth = require("../../midleware/validate-auth");
const settings = require("../../../AppConfig");
const { CreateCompanyInstance } = require("../../midleware/company-instance");

router.get("/", CheckAuth, CreateCompanyInstance, (req, res) => {
  switch (req.query.FormName) {
    case "Machine":
      controller.Machines.getList(req, res);
      break;
    case "Stages":
      controller.Stages.getList(req, res);
      break;
    case "Routing":
      controller.Routing.getList(req, res);
      break;
    case "Shift":
      controller.Shift.getList(req, res);
      break;
    case "BOM":
      controller.BOM.getList(req, res);
      break;
    case "MO":
      controller.MOEntry.getList(req, res);
      break;
    case "MOIssuance":
      controller.MOIssuance.getList(req, res);
      break;
    case "MOReceipt":
      controller.MOReceipt.getList(req, res);
      break;
    default:
      break;
  }
});

module.exports = router;
