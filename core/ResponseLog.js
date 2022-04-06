var fs = require("fs");
const db = require("../api/models/index");

exports.Error200 = async (req, resp, err) => {
  let response = "";
  resp.writeHead(200, "Server Response with Failure", {
    "content-type": "application/json",
  });
  response = JSON.stringify({ Success: false, Message: err });
  resp.write(response);
  var log = "\n Log Started on" + new Date().toISOString();
  log = log + "\n ************************************************** \n";
  log = log + "\n API : " + req.baseUrl + " -- Method : " + req.method;
  log = log + "\n FormName : " + req.body.FormName;
  log = log + "\n Message : " + response;
  log =
    log + "\n **************************************************  \n Log Ended";
  fs.appendFile("log.txt", log,(err)=>{});
  resp.end();
};

exports.Delete200 = async (req, resp) => {
  // await db.sequelize.query("EXEC UpdateUseCount", {
  //   type: Sequelize.QueryTypes.SELECT,
  // });
  let response = "";
  resp.writeHead(200, "Record Deleted Successfully!", {
    "content-type": "application/json",
  });
  response = JSON.stringify({
    Success: true,
    Message: "Record Deleted Successfully!",
  });
  resp.write(response);
  resp.end();
};

exports.Create200 = async (req, resp) => {
  // await db.sequelize.query("EXEC UpdateUseCount", {
  //   type: Sequelize.QueryTypes.SELECT,
  // });
      let response = "";
      resp.writeHead(200, "Record Created Successfully!", {
        "content-type": "application/json",
      });
      response = JSON.stringify({
        Success: true,
        Message: "Record Created Successfully!",
      });
      resp.write(response);
      resp.end();
};

exports.Update200 = async (req, res) => {
  // await db.sequelize.query("EXEC UpdateUseCount", {
  //   type: Sequelize.QueryTypes.SELECT,
  // });
      let response = "";
      res.writeHead(200, "Record Updated Successfully!", {
        "content-type": "application/json",
      });
      response = JSON.stringify({
        Success: true,
        Message: "Record Updated Successfully!",
      });
      res.write(response);
      res.end();
};

exports.Send200 = async (req, res, data) => {
  let response = "";
  res.writeHead(200, "Server Response with Success", {
    "content-type": "application/json",
  });
  response = JSON.stringify({
    Success: true,
    Message: data,
  });
  res.write(response);
  res.end();
};
