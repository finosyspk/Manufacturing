const db = require("../../models/index");
const Decrypter = require("../../../core/decrypt");
const AppConfig = require("../../../AppConfig");
const ResponseLog = require("../../../core/ResponseLog");
const useragent = require("useragent");
const jwt = require("jsonwebtoken");

let response;
let sqlQuery;
exports.getOne = async (req, res) => {
  try {
    const agent = useragent.parse(req.headers["user-agent"]);

    let signvalues = {
      Session: req.body.Session,
      OS: agent.os.toString(),
      WebBrowser: agent.toString(),
      Ver: agent.toVersion(),
      HardWare: agent.device.toString(),
    };

    const token = jwt.sign(signvalues, AppConfig.JWT_KEY, {
      expiresIn: "365d",
    });

    response = {};

    sqlQuery = `SELECT UserID,UserName,Designation,ContactNo=U.ContactNo,Email=U.Email,
                CompID=U.CompID, CompName, CompCode=[DB_Name] 
                FROM Users U INNER JOIN Company C ON U.CompID = C.CompID
                WHERE U.IsActive = 1 AND UserName = :UserName`;

    let userData = await db.sequelize.query(sqlQuery, {
      replacements: { UserName: req.body.UserName },
      type: db.Sequelize.QueryTypes.SELECT,
    });
    let user = userData[0];

    if (user && authenticatePassword(user.Password, req.body.Password)) {
      response.webtoken = token;
      response.UserData = user;

      sqlQuery = `SELECT id=ControlID, title=Module,type='collapse' FROM Menu WHERE ControlType='Menu' order by SortOrder`;

      let Module = await db.sequelize.query(sqlQuery, {
        replacements: { UserID: user.UserID },
        type: db.Sequelize.QueryTypes.SELECT,
      });

      Module = JSON.stringify(Module)
      Module = JSON.parse(Module)

      sqlQuery = `SELECT id=ControlID,title=ControlName,type='collapse',PCID=PCID FROM Menu WHERE ControlType='SMnu' AND IsActive=1`;

      let PMenuData = await db.sequelize.query(sqlQuery, {
        replacements: { UserID: user.UserID },
        type: db.Sequelize.QueryTypes.SELECT,
      });

      PMenuData = JSON.stringify(PMenuData)
      PMenuData = JSON.parse(PMenuData)

      sqlQuery = `SELECT id=Menu.ControlID,title=ControlName,type='item',url='/' + REPLACE(ControlName, ' ', ''),PCID,
          [Create]=RD.[Create], [Edit]=RD.Edit, [View]=RD.[View], [Delete]=RD.[Delete],[Post]=RD.[Post], [Approval]=RD.Approval
          FROM Menu INNER JOIN RoleDetail RD ON RD.ControlID = Menu.ControlID
          INNER JOIN [UserRoles] UR ON UR.RoleID = RD.RoleID
          WHERE UR.UserID=:UserID AND
          PCID <> 0 AND IsActive=1`;

      let CMenuData = await db.sequelize.query(sqlQuery, {
        replacements: { UserID: user.UserID },
        type: db.Sequelize.QueryTypes.SELECT,
      });

      CMenuData = JSON.stringify(CMenuData)
      CMenuData = JSON.parse(CMenuData)

      PMenuData.map((val) => {
        val.children = CMenuData.filter((e) => e.PCID === val.id);
        return val;
      });



      console.log({PMenuData})

      Module.map((val) => {
        if (val.id === '2') {
          val.children = CMenuData.filter((f) => f.PCID === val.id);
        } else {
          val.children = PMenuData.filter((f) => f.PCID === val.id && f.children.length > 0);
        }
        return val;
      });

      let pages = {
        id: "menu",
        type: "group",
        children: Module.filter(v => v.children.length > 0),
      };

      response.Menu = pages;

      res.status(200).send(response);
    } else {
      res.status(401).send("Invalid User / Password!");
    }
  } catch (ex) {
    console.log(ex);
    ResponseLog.Error200(req, res, ex.message);
  }
};

const authenticatePassword = (userPass, reqPass) => {
  // const secretKey = AppConfig.SKey;
  // const decryptedUserPass = Decrypter.decrypt(userPass, secretKey);
  // const decryptedReqPass = Decrypter.decrypt(reqPass, secretKey);
  // if (decryptedUserPass === decryptedReqPass) {
  return true;
  // }
  return false;
};