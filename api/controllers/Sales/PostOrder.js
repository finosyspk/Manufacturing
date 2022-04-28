const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");

exports.postData = async (req, res) => {
  try {
    let TransNo = req.body.Header.TransNo;

    let REQ = await SeqFunc.getOne(
      db[req.headers.compcode].SOP_InvoiceMaster,
      {
        where: { TransNo: TransNo },
      }
    );

    if (REQ.success) {
      await db[req.headers.compcode].SOP_InvoiceMaster.update({
        Posted: 1,
        PostedUser:1,
        postedAt:new Date()
      },
      {
        where: { TransNo: TransNo },
      })
      ResponseLog.Send200(req, res, "Record Submitted Successfully");
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};
