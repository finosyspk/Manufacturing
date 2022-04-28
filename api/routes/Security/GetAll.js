const express = require("express");
const router = express.Router();
const controller = require("../../controllers/Security/index");
const CheckAuth = require("../../midleware/validate-auth");

router.get("/", CheckAuth,(req, res) => {
  console.log("Form : ", req.query.FormName);
  switch (req.query.FormName) {
    case "Roles":
      controller.Roles.getList(req, res);
      break;
    case "Users":
      controller.Users.getList(req, res);
      break;
    case "Company":
      controller.Company.getList(req, res);
      break;
    default:
      break;
  }
});

module.exports = router;
