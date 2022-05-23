const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");
const MaterialData = require("../../../core/MaterialData");
// const { Op } = require("sequelize/types");


exports.getJobs = async (req, res) => {
  try {
    let Columns = [];

    Columns = ["JobCode", ["JobDesc","Job"]];
    let Job = await SeqFunc.getAll(req.sequelizeDB.FIN_Jobs, { where: { JobHead: 1 } }, true, Columns);


    ResponseLog.Send200(req, res, {
      Job: Job.Data,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getTaxSchedule = async (req, res) => {
  try {
    console.log("There!")
    let Columns = [];

    Columns = ["TaxScheduleCode", "TaxSchedule"];
    let TaxSchedule = await SeqFunc.getAll(req.sequelizeDB.FIN_TaxSchedule, { where: { IsActive: true } }, true, Columns);


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
    let Columns = [
      "TaxScheduleID",
      "TaxScheduleCode",
      "TaxSchedule",
      "TaxDetailID",
      "TaxDetail",
      "TaxDetailCode",
      "TaxType",
      "AcctCode",
      "AcctDesc",
      "TaxRate",
      [req.sequelizeDB.sequelize.literal('0'), "TaxAmount"],
      [req.sequelizeDB.sequelize.literal('0'), "TaxAmount_Cur"]
    ];

    let Taxes = await req.sequelizeDB.FIN_TaxScheduleDetail.findAll({ where: { TaxScheduleCode: req.query.TaxScheduleCode }, attributes: Columns });

    let regColumns = ["TaxDetailCode", "TaxDetail", "TaxType", "TaxRate", "TaxAmount"];
    let Data = await MaterialData.Register(Taxes, regColumns);

    ResponseLog.Send200(req, res, {
      TaxDetail: Data,
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
    let Accounts = await SeqFunc.getAll(req.sequelizeDB.FIN_CodeCombination, { where: { Enabled: true } }, true, Columns);


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

    Columns = [["PayTermCode", "PaymentTermsCode"], ["PayTermDesc", "PaymentTerms"]];
    let PayTerms = await SeqFunc.getAll(req.sequelizeDB.FIN_PayTerms, { where: { IsActive: true } }, true, Columns);


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

    Columns = [["CardCode", "SalesPersonCode"], ["CardName", "SalesPerson"]];
    let SalesPersons = await SeqFunc.getAll(req.sequelizeDB.FIN_Cards, { where: { IsSalesMan: true } }, true, Columns);


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

    Columns = ["CustomerCode", "Customer"];
    let Customers = await SeqFunc.getAll(req.sequelizeDB.FIN_Customers, { where: { IsActive: true } }, true, Columns);


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

    Columns = ["CurCode", "CurName", "CurSymbol"];
    let Currencies = await SeqFunc.getAll(req.sequelizeDB.FIN_Currencies, {}, true, Columns);

    ResponseLog.Send200(req, res, {
      Currencies: Currencies.Data,
    });
  } catch (err) {
    console.log(err);
    ResponseLog.Error200(req, res, err.message);
  }
};

