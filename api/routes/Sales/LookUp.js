const express = require("express");
const router = express.Router();
const controller = require("../../controllers/Sales/index");
const CheckAuth = require("../../midleware/validate-auth");

router.get("/", CheckAuth, (req, res) => {
  switch (req.body.FormName) {
    case "Routing":
      controller.LookUp.getRouting(req, res);
      break;
    case "Users":
      controller.Users.delete(req, res);
      break;
    case "Company":
      controller.Company.delete(req, res);
      break;
    default:
      break;
  }
});

module.exports = router;
