const express = require("express");
const router = express.Router();
const controller = require("../../controllers/Security/index");
const CheckAuth = require("../../midleware/validate-auth");

router.post("/",  (req, res, next) => {
  switch (req.body.FormName) {
    case "Roles":
      controller.Roles.add(req, res);
      break;
    case "Users":
      controller.Users.add(req, res);
      break;
    case "Company":
      controller.Company.CreateOrUpdate(req, res, next);
      break;
    default:
      break;
  }
});

module.exports = router;
