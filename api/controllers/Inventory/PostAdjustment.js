const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");
const Stock = require("../../../core/Stock");


exports.postData = async (req, res) => {
  try {
    let TransNo = req.body.Header.TransNo;
    let REQ = await SeqFunc.getOne( db[req.headers.compcode].INV_TransactionHeader,{ where: { TransNo: TransNo } } );

    if (REQ.success) {

      if (REQ.Data.FormType === 'AdjInward'){
        await Stock.Addition.Addition(db[req.headers.compcode],db[req.headers.compcode].INV_TransactionDetail, TransNo, REQ.Data.LocationCode, REQ.Data.Location, res)
      }
      else {
        await Stock.Allocation.Allocation(db[req.headers.compcode],db[req.headers.compcode].INV_TransactionDetail, TransNo, REQ.Data.LocationCode, REQ.Data.Location, res)
      }
      
      await db[req.headers.compcode].INV_TransactionHeader.update({
        Posted: 1,
        PostedUser:1,
        postedAt:new Date()
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
