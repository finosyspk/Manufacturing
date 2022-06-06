const AppConfig = require('./../../AppConfig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const dbsbs = require('../../api/models-sbs/index')

exports.Allocation = async (db, model, TransNo, TransDate, TransType,LocationCode) => {
    try {

        let DetailData = await model.findAll({where : { TransNo : TransNo}})

        DetailData = JSON.stringify(DetailData);
        DetailData = JSON.parse(DetailData);

        let UPD = "EXEC [dbo].[UpdateParallelData]"
        let AllocArray = []
        let AllocTemp = [];
        let Alloc;
        let Temp;

        let query = `SELECT 
                    S.HeaderNo, S.LocationCode, S.ItemCode, L.Location, Item, ItemTrackBy, S.BatchNo,
                    QtyIn, UnitPrice, AvgCost, ExpiryDate,
                    SUM(ISNULL(A.QtyOut,0)) AS QtyAlloc,
                    SUM(ISNULL(D.QtyOut,0)) AS QtyOut,
                    QtyIn - (SUM(ISNULL(A.QtyOut,0)) + SUM(ISNULL(D.QtyOut,0))) AS QtyBal
                    FROM SBS_COASTAL..IN_StockMaster S
                    INNER JOIN SBS_COASTAL..IN_Item I ON I.ItemCode = S.ItemCode
                    INNER JOIN SBS_COASTAL..IN_Location L ON L.LocationCode = S.LocationCode
                    LEFT OUTER JOIN SBS_COASTAL..IN_StockAlloc A ON A.HeaderNo = S.HeaderNo
                    LEFT OUTER JOIN SBS_COASTAL..IN_StockDetail D ON D.HeaderNo = S.HeaderNo
                    WHERE S.LocationCode = '${LocationCode}'
                    GROUP BY S.HeaderNo,S.LocationCode,S.ItemCode,L.Location,I.Item,I.ItemTrackBy,S.BatchNo,QtyIn,UnitPrice,AvgCost,ExpiryDate
                    HAVING QtyIn > (SUM(ISNULL(A.QtyOut,0)) + SUM(ISNULL(D.QtyOut,0)))`
        
        let StockData = await db.sequelize.query(query, { type: db.Sequelize.QueryTypes.SELECT })

        StockData = JSON.stringify(StockData);
        StockData = JSON.parse(StockData);

        await Promise.all(
            DetailData.map(function (val) {
                let QtyReq = 0
                let QtyFul = 0
                let QtyLine = 0
//                if (val.ItemType === 'Inventoried Item') {
                    // if (val.ItemTrackBy !== 'None') {
                    //     let Batch = val.Batches
                    //     if (Batch.length > 0) {
                    //         Batch.map(function (val2) {
                    //             QtyReq = val2.UnitQuantity;
                    //             QtyFul = 0
                    //             QtyLine = 0

                    //             for (let itm of StockData) {
                    //                 if (val.ItemCode === itm.ItemCode && val2.BatchNo === itm.BatchNo) {

                    //                     if (QtyFul >= QtyReq) {
                    //                         break;
                    //                     }

                    //                     if (itm.QtyBal > (QtyReq - QtyFul)) {
                    //                         QtyLine = QtyReq - QtyFul
                    //                     }
                    //                     else {
                    //                         QtyLine = itm.QtyBal
                    //                     }

                    //                     QtyFul = QtyFul + QtyLine

                    //                     Alloc = {
                    //                         RID: 0,
                    //                         RecordDate: new Date(),
                    //                         HeaderNo: itm.HeaderNo,
                    //                         LocationCode: val.LocationCode,
                    //                         ItemCode: val.ItemCode,
                    //                         BatchNo: itm.BatchNo,
                    //                         ExpiryDate: itm.ExpiryDate,
                    //                         TransType: val.TransType,
                    //                         TransNo: val.TransNo,
                    //                         TransDate: val.TransDate,
                    //                         QtyOut: QtyLine,
                    //                         UnitCost: itm.UnitPrice,
                    //                         LineNo: val.TLineSeq
                    //                     }

                    //                     AllocArray.push(Alloc)

                    //                     Temp = {
                    //                         HeaderNo: itm.HeaderNo,
                    //                         LocationCode: val.LocationCode,
                    //                         ItemCode: val.ItemCode,
                    //                         BatchNo: itm.BatchNo,
                    //                         TransType: val.TransType,
                    //                         TransNo: val.TransNo,
                    //                         TransDate: val.TransDate,
                    //                         QtyOut: val.Quantity,
                    //                         Pieces: 0,
                    //                         QtyPass: QtyLine,
                    //                         QtyFail: 0,
                    //                         LineNo: val.TLineSeq,
                    //                         Status: 'Pass'
                    //                     }
                    //                     AllocTemp.push(Temp)
                    //                 }
                    //             }
                    //         })
                    //     }
                    // }
                    // else {

                        QtyReq = val.BaseQuantity;

                        for (let itm of StockData) {
                            if (val.CItemCode === itm.ItemCode) {
                                if (QtyFul >= QtyReq) {
                                    break;
                                }

                                if (itm.QtyBal > (QtyReq - QtyFul)) {
                                    QtyLine = QtyReq - QtyFul
                                }
                                else {
                                    QtyLine = itm.QtyBal
                                }

                                QtyFul = QtyFul + QtyLine

                                Alloc = {
                                    RID: 0,
                                    RecordDate: new Date(),
                                    HeaderNo: itm.HeaderNo,
                                    LocationCode: itm.LocationCode,
                                    Location: itm.Location,
                                    ItemCode: itm.ItemCode,
                                    Item: itm.Item,
                                    BatchNo: '',
                                    TransType: TransType,
                                    ItemTrackBy: itm.ItemTrackBy,
                                    TransNo: TransNo,
                                    TransDate: TransDate,
                                    QtyOut: QtyLine,
                                    UnitCost: itm.UnitPrice,
                                    LineNo: val.PickLineID
                                }
                                AllocArray.push(Alloc)
                            }
                        // }
                    }

                    if (QtyFul < QtyReq) {
                        Temp = {
                            HeaderNo: 0,
                            LocationCode: val.LocationCode,
                            ItemCode: val.ItemCode,
                            BatchNo: '',
                            TransType: val.TransType,
                            TransNo: val.TransNo,
                            TransDate: val.TransDate,
                            QtyOut: val.QtyOut,
                            Pieces: 0,
                            QtyPass: 0,
                            QtyFail: QtyFul,
                            LineNo: val.TLineSeq,
                            Status: 'Fail'
                        }

                        AllocTemp.push(Temp)
                    }
                // }
            })
        );

        let FailCount = 0

        if (FailCount > 0) {
            // await dbsbs.IN_StockDetail.destroy({
            //     where: {
            //         TransNo: TransNo
            //     },
            //     transaction: t
            // })
            let respData = obj.filter(val => val.StatusCode === 0)

            if (respData.length > 0) {
                let resp = {
                    columns: [
                        {
                            title: "Item Code",
                            field: "ItemCode",
                            headerStyle: {
                                border: "1px solid #ccc8c8",
                                fontWeight: "bolder",
                                background: "#e3dede",
                                paddingTop: 1,
                                paddingBottom: 1,
                                width: "35%",
                            },
                            cellStyle: {
                                border: "1px solid #ccc8c8",
                                paddingTop: 1,
                                paddingBottom: 1,
                                width: "35%",
                            },
                        },
                        {
                            title: "Filed Qty",
                            field: "QtyFail",
                            headerStyle: {
                                border: "1px solid #ccc8c8",
                                fontWeight: "bolder",
                                background: "#e3dede",
                                paddingTop: 1,
                                paddingBottom: 1,
                                width: "35%",
                            },
                            cellStyle: {
                                border: "1px solid #ccc8c8",
                                paddingTop: 1,
                                paddingBottom: 1,
                                width: "35%",
                            },
                        },
                        {
                            title: "Status",
                            field: "Status",
                            headerStyle: {
                                border: "1px solid #ccc8c8",
                                fontWeight: "bolder",
                                background: "#e3dede",
                                paddingTop: 1,
                                paddingBottom: 1,
                                width: "35%",
                            },
                            cellStyle: {
                                border: "1px solid #ccc8c8",
                                paddingTop: 1,
                                paddingBottom: 1,
                                width: "35%",
                            },
                        },
                    ],
                    rows: respData,
                };
                return { Success: false, Message: "Allocation Process RollBacked!", data: resp }
            }
        }
        else {
            await dbsbs.IN_StockDetail.bulkCreate(AllocArray)
            // await dbsbs.sequelize.query(UPD)
            return { Success: true, Message: "Allocation Process Completed!", data: [] }
        }
    }
    catch (ex) {
        console.log(ex.message)
        return { Success: false, Message: "Allocation Process RollBacked!", data: resp }
    }
};