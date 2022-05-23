"use strict";
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const Master = require("../models/index");
const db = {};

var CompInst = async (compDB) => {
  try {
    let Comp = await Master.Company.findOne({ where: { CompCode: compDB } });
    Comp = JSON.stringify(Comp);
    Comp = JSON.parse(Comp);
    // Comp.map((val) => {
    let Server = Comp.DB_Server.split(",");

    let Item = {
      username: Comp.DB_User,
      password: Comp.DB_Pass,
      database: Comp.DB_Name,
      host: Server[0],
      port: Server[1] || "1433",
      dialect: "mssql",
      pool: {
        max: 1,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      logging: true,
      logQueryParameters: true,
      dialectOptions: {
        options: {
          requestTimeout: 300000,
          encrypt: true,
          validateBulkLoadParameters: false,
        },
        timeout: 30,
        useUTC: false,
        dateStrings: true,
      },
      define: {
        freezeTableName: false,
        timestamps: true,
      },
      timezone: "Asia/Karachi",
    };

    let sequelize = new Sequelize(Item)

    fs
      .readdirSync(__dirname)
      .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
      })
      .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        db[model.name] = model;
      });
    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    // fs.readdirSync(__dirname)
    //   .filter((file) => {
    //     return (
    //       file.indexOf(".") !== 0 &&
    //       file !== basename &&
    //       file.slice(-3) === ".js"
    //     );
    //   })
    //   .forEach((file) => {
    //     const model = require(path.join(__dirname, file))(
    //       db.sequelize,
    //       Sequelize.DataTypes
    //     );
    //     db[model.name] = model;
    //   });

    // Object.keys(db).forEach((modelName) => {
    //   if (db[modelName].associate) {
    //     db[modelName].associate(db);
    //   }
    // });
    // db.Sequelize = Sequelize;
    // return db[val["CompCode"]]
    // });
    // return db
  } catch (err) {
    console.log(err);
  }
}

module.exports.Company = { db, CompInst };
