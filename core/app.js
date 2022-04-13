const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");

app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));

app.use(bodyparser.json({ limit: "50mb" }));
app.use(cors());

app.use("/assets", express.static(path.join(__dirname, "/../build/assets")));
app.use("/img", express.static(path.join(__dirname, "/../build/img")));
app.use("/js", express.static(path.join(__dirname, "/../build/js")));
app.use("/static", express.static(path.join(__dirname, "/../build/static")));

const Auth_LogIn = require("../api/routes/Security/LogIn");
const Auth_Testing = require("../api/routes/Security/Testing");
const Auth_Create = require("../api/routes/Security/Create");
const Auth_Get = require("../api/routes/Security/Get");
const Auth_GetAll = require("../api/routes/Security/GetAll");
const Auth_Delete = require("../api/routes/Security/Delete");

const Man_Testing = require("../api/routes/Manufacturing/Testing");
const Man_Create = require("../api/routes/Manufacturing/Create");
const Man_Get = require("../api/routes/Manufacturing/Get");
const Man_GetAll = require("../api/routes/Manufacturing/GetAll");
const Man_Delete = require("../api/routes/Manufacturing/Delete");
const Man_LookUp = require("../api/routes/Manufacturing/LookUp");

const Inv_Testing = require("../api/routes/Inventory/Testing");
const Inv_Create = require("../api/routes/Inventory/Create");
const Inv_Get = require("../api/routes/Inventory/Get");
const Inv_GetAll = require("../api/routes/Inventory/GetAll");
const Inv_Delete = require("../api/routes/Inventory/Delete");
const Inv_LookUp = require("../api/routes/Inventory/LookUp");

const Pur_Testing = require("../api/routes/Purchasing/Testing");
const Pur_Create = require("../api/routes/Purchasing/Create");
const Pur_Get = require("../api/routes/Purchasing/Get");
const Pur_GetAll = require("../api/routes/Purchasing/GetAll");
const Pur_Delete = require("../api/routes/Purchasing/Delete");
const Pur_LookUp = require("../api/routes/Purchasing/LookUp");

const Sales_Testing = require("../api/routes/Sales/Testing");
const Sales_Create = require("../api/routes/Sales/Create");
const Sales_Get = require("../api/routes/Sales/Get");
const Sales_GetAll = require("../api/routes/Sales/GetAll");
const Sales_Delete = require("../api/routes/Sales/Delete");
const Sales_LookUp = require("../api/routes/Sales/LookUp");

const PF_Testing = require("../api/routes/ProvidentFund/Testing");
const PF_Create = require("../api/routes/ProvidentFund/Create");
const PF_Get = require("../api/routes/ProvidentFund/Get");
const PF_GetAll = require("../api/routes/ProvidentFund/GetAll");
const PF_Delete = require("../api/routes/ProvidentFund/Delete");
const PF_LookUp = require("../api/routes/ProvidentFund/LookUp");

const Fnd_Testing = require("../api/routes/Foundation/Testing");
const Fnd_Create = require("../api/routes/Foundation/Create");
const Fnd_Get = require("../api/routes/Foundation/Get");
const Fnd_GetAll = require("../api/routes/Foundation/GetAll");
const Fnd_Delete = require("../api/routes/Foundation/Delete");
const Fnd_LookUp = require("../api/routes/Foundation/LookUp");

const Fin_Testing = require("../api/routes/Financial/Testing");
const Fin_Create = require("../api/routes/Financial/Create");
const Fin_Get = require("../api/routes/Financial/Get");
const Fin_GetAll = require("../api/routes/Financial/GetAll");
const Fin_Delete = require("../api/routes/Financial/Delete");
const Fin_LookUp = require("../api/routes/Financial/LookUp");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Expose-Headers", "build");
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, DELETE, PATCH, OPTIONS HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/v1/Auth/Testing", Auth_Testing);
app.use("/api/v1/Auth/LogIn", Auth_LogIn);
app.use("/api/v1/Auth/Create", Auth_Create);
app.use("/api/v1/Auth/Get", Auth_Get);
app.use("/api/v1/Auth/GetAll", Auth_GetAll);
app.use("/api/v1/Auth/Delete", Auth_Delete);

app.use("/api/v1/Manufacturing/Testing", Man_Testing);
app.use("/api/v1/Manufacturing/Create", Man_Create);
app.use("/api/v1/Manufacturing/Get", Man_Get);
app.use("/api/v1/Manufacturing/GetAll", Man_GetAll);
app.use("/api/v1/Manufacturing/Delete", Man_Delete);
app.use("/api/v1/Manufacturing/LookUp", Man_LookUp);

app.use("/api/v1/Inventory/Testing", Inv_Testing);
app.use("/api/v1/Inventory/Create", Inv_Create);
app.use("/api/v1/Inventory/Get", Inv_Get);
app.use("/api/v1/Inventory/GetAll", Inv_GetAll);
app.use("/api/v1/Inventory/Delete", Inv_Delete);
app.use("/api/v1/Inventory/LookUp", Inv_LookUp);

app.use("/api/v1/Purchasing/Testing", Pur_Testing);
app.use("/api/v1/Purchasing/Create", Pur_Create);
app.use("/api/v1/Purchasing/Get", Pur_Get);
app.use("/api/v1/Purchasing/GetAll", Pur_GetAll);
app.use("/api/v1/Purchasing/Delete", Pur_Delete);
app.use("/api/v1/Purchasing/LookUp", Pur_LookUp);

app.use("/api/v1/Sales/Testing", Sales_Testing);
app.use("/api/v1/Sales/Create", Sales_Create);
app.use("/api/v1/Sales/Get", Sales_Get);
app.use("/api/v1/Sales/GetAll", Sales_GetAll);
app.use("/api/v1/Sales/Delete", Sales_Delete);
app.use("/api/v1/Sales/LookUp", Sales_LookUp);

app.use("/api/v1/ProvidentFund/Testing", PF_Testing);
app.use("/api/v1/ProvidentFund/Create", PF_Create);
app.use("/api/v1/ProvidentFund/Get", PF_Get);
app.use("/api/v1/ProvidentFund/GetAll", PF_GetAll);
app.use("/api/v1/ProvidentFund/Delete", PF_Delete);
app.use("/api/v1/ProvidentFund/LookUp", PF_LookUp);

app.use("/api/v1/Foundation/Testing", Fnd_Testing);
app.use("/api/v1/Foundation/Create", Fnd_Create);
app.use("/api/v1/Foundation/Get", Fnd_Get);
app.use("/api/v1/Foundation/GetAll", Fnd_GetAll);
app.use("/api/v1/Foundation/Delete", Fnd_Delete);
app.use("/api/v1/Foundation/LookUp", Fnd_LookUp);

app.use("/api/v1/Financial/Testing", Fin_Testing);
app.use("/api/v1/Financial/Create", Fin_Create);
app.use("/api/v1/Financial/Get", Fin_Get);
app.use("/api/v1/Financial/GetAll", Fin_GetAll);
app.use("/api/v1/Financial/Delete", Fin_Delete);
app.use("/api/v1/Financial/LookUp", Fin_LookUp);

app.use("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../build/index.html"));
});

module.exports = app;
