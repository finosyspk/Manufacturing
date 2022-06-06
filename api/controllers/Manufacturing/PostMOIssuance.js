const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");
const Stock = require("../../../core/Stock");



exports.postData = async (TransNo, req, res) => {
  try {
    let MOI = await SeqFunc.getOne(req.sequelizeDB.MOP_Issuance, { where: { TransNo: TransNo } });

    if (MOI.success) {
      await Stock.Allocation.Allocation(req.sequelizeDB, req.sequelizeDB.MOP_IssuanceDetail, TransNo, MOI.Data.TransDate,'PCK', MOI.Data.LocationCode)
      await req.sequelizeDB.MOP_Issuance.update({
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
