const db = require("../../models-Clients/index");
const ResponseLog = require("../../../core/ResponseLog");
const SeqFunc = require("../../../core/SeqFunc");

exports.getList = async (req, res) => {
  try {
    let Columns = [
      "TransNo","TransDate",["MOTransNo","MO No"],"Item","UOM","RoutingName","StageName"
    ];
    let MOIssuance = await SeqFunc.getAll(
      db[req.headers.compcode].MOP_Issuance,
      {},
      true,
      Columns
    );
    if (MOIssuance.success) {
      ResponseLog.Send200(req, res, MOIssuance.Data);
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.getOne = async (req, res) => {
  try {
    let MOIssuance = await SeqFunc.getOne(db[req.headers.compcode].MOP_Issuance, {
      where: { TransNo: req.query.TransNo },
    });

    if (MOIssuance.success) {
      let Detail = await SeqFunc.getAll(
        db[req.headers.compcode].MOP_IssuanceDetail,
        { PickID: MOIssuance.Data.PickID },
        false,
        ["CItemCode","CItem","UOMCode","UOM","Quantity","StageCode","StageName"]
      );

      let Data = {
        Header: MOIssuance.Data,
        Detail: Detail.Data,
      };

      ResponseLog.Send200(req, res, Data);
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    let MOIssuance = await SeqFunc.getOne(
      db[req.headers.compcode].MOP_Issuance,
      { where: { TransNo: req.query.TransNo, Posted: false } },
      Header
    );

    if (MOIssuance.success) {
      await SeqFunc.Delete(db[req.headers.compcode].MOP_IssuanceDetail, {
        where: { PickID: MOIssuance.Data.PickID },
      });
      await SeqFunc.Delete(db[req.headers.compcode].MOP_Issuance, {
        where: { PickID: MOIssuance.Data.PickID },
      });
      ResponseLog.Delete200(req, res);
    } else {
      ResponseLog.Error200(req, res, "No Record Found!");
    }
  } catch (err) {
    ResponseLog.Error200(req, res, err.message);
  }
};

exports.CreateOrUpdate = async (req, res) => {
  const t = await db[req.headers.compcode].sequelize.transaction();
  try {

    let Header = req.body.Header;
    let Detail = req.body.Detail;
    delete Header.PickID;

    Header.CreatedUser = '1'
    Header.ModifyUser = '1'
    Header.TransStatus = '1'

    let MOIssuanceData = await SeqFunc.Trans_updateOrCreate(
      db[req.headers.compcode],
      db[req.headers.compcode].MOP_Issuance,
      { where: { TransNo: Header.TransNo ? Header.TransNo : '' },transaction:t },
      Header,
      t
    );

    if (MOIssuanceData.success) {
      Detail.map((o) => {
        o.PickID = MOIssuanceData.Data.PickID
        delete o.PickLineID
        return o
      });

      let MOIssDData = await SeqFunc.Trans_bulkCreate(
        db[req.headers.compcode].MOP_IssuanceDetail,
        { where: { PickID: MOIssuanceData.Data.PickID },transaction:t },
        Detail,
        t
      );
      if (MOIssDData.success) {
        
        let MO = await db[req.headers.compcode].MOP_MOHeader.findOne({ attributes: ["MOID"], where: { TransNo: MOIssuanceData.Data.MOTransNo },transaction:t }) 
        await db[req.headers.compcode].MOP_MODetail.update({Completed: true},{ where: { MOID: MO.MOID },transaction:t })
        let Count = await db[req.headers.compcode].MOP_MODetail.count({ where: { MOID: MO.MOID, Completed:false },transaction:t })
        await db[req.headers.compcode].MOP_MOHeader.update({MOStatus: Count === 0 ? 'Ready to Receive' : 'In Process'},{ where: { MOID: MO.MOID },transaction:t })
        t.commit();
        if (MOIssDData.created) {
          ResponseLog.Create200(req, res);
        } else {
          ResponseLog.Update200(req, res);
        }
      } else {
        t.rollback();
        ResponseLog.Error200(req, res, "Error Saving Record!");
      }
    } else {
      t.rollback();
      ResponseLog.Error200(req, res, "Error Saving Record!");
    }
  } catch (err) {
    console.log(err)
    t.rollback();
    ResponseLog.Error200(req, res, err.message);
  }
};