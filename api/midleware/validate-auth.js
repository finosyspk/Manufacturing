const jwt = require("jsonwebtoken");
const settings = require("../../AppConfig");
const useragent = require("useragent");
const _ = require("lodash");
useragent(true);

module.exports = (req, res, next) => {
  const agent = useragent.parse(req.headers["user-agent"]);
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  let verifyvalues = {
    Session: req.headers.session,
    OS: agent.os.toString(),
    WebBrowser: agent.toString(),
    Ver: agent.toVersion(),
    HardWare: agent.device.toString(),
  };

  jwt.verify(token, settings.JWT_KEY, verifyvalues, function (err, response) {
    if (err) {
      res.status(203).json({ message: err.message });
    } else {
      var decoded = jwt.decode(token);

      delete decoded.iat;
      delete decoded.exp;
      if (_.isEqual(decoded, verifyvalues)) {
        req.data = response;
        next();
      } else {
        res
          .status(203)
          .json({ message: "Server Session Expired\\Invalidated!" });
      }
    }
  });
  
};
