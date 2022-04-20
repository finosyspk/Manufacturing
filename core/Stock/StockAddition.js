const AppConfig = require("./../../AppConfig");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.Addition = async (db, TransNo, model) => {
  try {
    let Data = await db[model].findAll({ where: { TransNo: TransNo } });

    Data.map((d) => {
      d.RecordDate = new Date()
      d.BatchNo = ''
      d.ExpiryDate = '01-01-1900'
      d.LineNo = d.TLineSeq
      d.QtySold = 0
      d.QtyAlloc = 0
      d.Status = 0

      return d
    });

    await db.IN_StockMaster.bulkCreate(Data);

    return { Success: true, Message: "Stock Added Successfully!" };
  } catch (ex) {
    console.log(ex);
    return {
      Success: false,
      Message: "Consumption Process RollBacked!",
      data: ex,
    };
  }
};
