const AppConfig = require('./../../AppConfig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

exports.Consumption = async (db, TransNo, model) => {
    try {
        let Data = await db[model].findAll({ where: { TransNo: TransNo }})
        await db.IN_StockMaster.bulkCreate(Data)

        return { Success: true, Message: "Stock Added Successfully!"}
    }
    catch (ex) {
        console.log(ex)
        return { Success: false, Message: "Consumption Process RollBacked!", data: ex }
    }
};