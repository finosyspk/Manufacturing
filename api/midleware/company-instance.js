"use strict";
const { Company } = require("../models-Clients/index")

exports.CreateCompanyInstance = (async (req, res, next) => {
  try {
    await Company.CompInst(req.headers.compcode)
    
    // console.log({db:Company.db})

    req.sequelizeDB = Company.db
    next()
 
  } catch (err) {
    console.log(err);
  }
});
