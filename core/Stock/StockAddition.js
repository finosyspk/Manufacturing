const AppConfig = require("./../../AppConfig");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.Addition = async (db, model, TransNo,LocationCode, Location) => {
  try {
    let Data = await model.findAll({ where: { TransNo: TransNo } });

    Data = JSON.stringify(Data)
    Data = JSON.parse(Data)

    Data.map((d) => {
      d.LocationCode = LocationCode
      d.Location = Location
      d.RecordDate = new Date()
      d.BatchNo = ''
      d.TransType = d.FormType ? d.FormType : d.TransType 
      d.ExpiryDate = '01-01-1900'
      d.LineNo = d.TLineSeq
      d.Quantity = d.BaseQuantity
      d.UnitPrice = d.UnitCost
      d.QtySold = 0
      d.QtyAlloc = 0
      d.Status = 0
      return d
    });
    console.log({Data})

    await db.INV_StockMaster.bulkCreate(Data);

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
