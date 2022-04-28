const express = require("express");
const router = express.Router();
const controller = require("../../controllers/Purchasing/index");
const CheckAuth = require("../../midleware/validate-auth");

router.get("/", CheckAuth,(req, res) => {
  console.log("Form : ", req.body.FormName);
  switch (req.body.FormName) {
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
    default:
      break;
  }
});

module.exports = router;
