const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");
const Stock = require("../../../core/Stock");


exports.postData = async (req, res) => {
  try {
    let TransNo = req.body.Header.TransNo;
    let MOR = await SeqFunc.getOne( db[req.headers.compcode].MOP_Receipt,{ where: { TransNo: TransNo } } );

    if (MOR.success) {
        await Stock.Addition.Addition(db[req.headers.compcode],db[req.headers.compcode].MOP_ReceiptDetail, TransNo, MOR.Data.LocationCode, MOR.Data.Location, res)
      
      await db[req.headers.compcode].MOP_Receipt.update({
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
