const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");
const MaterialData = require("../../../core/MaterialData");


exports.getTaxSchedule = async (req, res) => {
  try {
    console.log("There!")
    let Columns = [];

    Columns = ["TaxScheduleCode", "TaxSchedule"];
    let TaxSchedule = await SeqFunc.getAll(db[req.headers.compcode].FIN_TaxSchedule, {where :{IsActive:true}}, true, Columns);

    
    ResponseLog.Send200(req, res, {
      TaxSchedule: TaxSchedule.Data,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getAccounts = async (req, res) => {
  try {
    let Columns = [];

    Columns = ["AcctCode", "AcctDesc", "AcctType", "Category"];
    let Accounts = await SeqFunc.getAll(db[req.headers.compcode].FIN_CodeCombination, {where :{Enabled:true}}, true, Columns);

    
    ResponseLog.Send200(req, res, {
      Accounts: Accounts.Data,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

