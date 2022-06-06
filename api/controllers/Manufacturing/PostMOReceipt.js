const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");
const Stock = require("../../../core/Stock");
const dbsbs = require('../../models-sbs/index')




exports.postData = async (TransNo, req, res) => {
  try {
    let MOR = await SeqFunc.getOne(req.sequelizeDB.MOP_Receipt, { where: { TransNo: TransNo } });
    let MOI = await SeqFunc.getOne(req.sequelizeDB.MOP_MOHeader, { where: { TransNo: MOR.Data.MOTransNo } });

    let query = `SELECT CostAmount = SUM(QtyOut * UnitCost) FROM SBS_COASTAL..IN_StockDetail 
              WHERE TransNo IN (SELECT TransNo FROM MOP_Issuance H WHERE H.MOTransNo =  '${MOR.Data.MOTransNo}')`

    let Amount = await req.sequelizeDB.sequelize.query(query, {type: req.sequelizeDB.Sequelize.QueryTypes.SELECT })

    if (MOI.success) {

      let query = {
        RecordDate: new Date(),
        BranchCode: '001',
        LocationCode: MOI.Data.LocationCode,
        ItemCode: MOI.Data.ItemCode,
        BatchNo: '',
        ExpiryDate: null,
        BinNo: '',
        TransNature: 'MO',
        TransNo: MOI.Data.TransNo,
        TransDate: MOI.Data.TransDate,
        QtyIn: MOI.Data.Quantity,
        Pieces: 0,
        PcsLeg: 0,
        PcsShldr: 0,
        ShipDate: null,
        Vessel: '',
        Container: '',
        BL: '',
        UnitPrice: Number(Amount[0].CostAmount) / Number(MOI.Data.Quantity),
        Status: 0,
        LineNo: 1,
        QtySold: 0,
        AvgCost: 0,
        QtyAlloc: 0,
      };

      console.log(query)

      await dbsbs.IN_StockMaster.create(query);
      await req.sequelizeDB.MOP_Receipt.update({
        Posted: 1,
        PostedUser: 1,
        postedAt: new Date()
      },
        {
          where: { TransNo: TransNo },
        })
      ResponseLog.Send200(req, res, "Record Posted Successfully");
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};
