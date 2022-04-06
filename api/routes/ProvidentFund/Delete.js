const express = require("express");
const router = express.Router();
const controller = require("../../controllers/ProvidentFund/index");
const CheckAuth = require("../../midleware/validate-auth");

router.delete("/", CheckAuth, (req, res) => {
  switch (req.body.FormName) {
    case "Machines":
      controller.Machines.delete(req, res);
      break;
    case "Stages":
      controller.Stages.delete(req, res);
      break;
    case "Routing":
      controller.Routing.delete(req, res);
      break;
      case "Shift":
        controller.Shift.delete(req, res);
        break;
      case "BOM":
        controller.BOM.delete(req, res);
        break;
    default:
      break;
  }
});

module.exports = router;
