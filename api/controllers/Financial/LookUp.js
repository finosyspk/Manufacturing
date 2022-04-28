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

exports.getTaxDetail = async (req, res) => {
  try {
    console.log("There!")
    let Columns = [];

    Columns = ["TaxDetailCode", "TaxDetail","TaxType","TaxRate","AcctCode","Acctdesc"];
    let TaxDetail = await SeqFunc.getAll(db[req.headers.compcode].FIN_TaxScheduleDetail, {where :{IsActive:true}}, true, Columns);

    
    ResponseLog.Send200(req, res, {
      TaxDetail: TaxDetail.Data,
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

exports.getPayTerms = async (req, res) => {
  try {
    let Columns = [];

    Columns = [["PayTermCode","PaymentTermsCode"], ["PayTermDesc","PaymentTerms"]];
    let PayTerms = await SeqFunc.getAll(db[req.headers.compcode].FIN_PayTerms, {where :{IsActive:true}}, true, Columns);

    
    ResponseLog.Send200(req, res, {
      PayTerms: PayTerms.Data,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getSalesPersons = async (req, res) => {
  try {
    let Columns = [];

    Columns = [["CardCode","SalesPersonCode"], ["CardName","SalesPerson"]];
    let SalesPersons = await SeqFunc.getAll(db[req.headers.compcode].FIN_Cards, {where :{IsSalesMan:true}}, true, Columns);

    
    ResponseLog.Send200(req, res, {
      SalesPersons: SalesPersons.Data,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getCustomers = async (req, res) => {
  try {
    let Columns = [];

    Columns = ["CustomerCode","Customer"];
    let Customers = await SeqFunc.getAll(db[req.headers.compcode].FIN_Customers, {where :{IsActive:true}}, true, Columns);

    
    ResponseLog.Send200(req, res, {
      Customers: Customers.Data,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getCurrencies = async (req, res) => {
  try {
    let Columns = [];

    Columns = ["CurCode","CurName","CurSymbol"];
    let Currencies = await SeqFunc.getAll(db[req.headers.compcode].FIN_Currencies, {}, true, Columns);
    
    ResponseLog.Send200(req, res, {
      Currencies: Currencies.Data,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

