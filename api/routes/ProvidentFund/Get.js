const express = require("express");
const router = express.Router();
const controller = require("../../controllers/ProvidentFund/index");
const CheckAuth = require("../../midleware/validate-auth");

router.get("/", CheckAuth, (req, res) => {
  console.log({ FormName: req.body.FormName });
  switch (req.body.FormName) {
    case "Machines":
      controller.Machines.getOne(req, res);
      break;
    case "Stages":
      controller.Stages.getOne(req, res);
      break;
    case "Routing":
      controller.Routing.getOne(req, res);
      break;
    case "Shift":
      controller.Shift.getOne(req, res);
      break;
    case "BOM":
      controller.BOM.getOne(req, res);
      break;
    default:
      break;
  }
});

module.exports = router;
