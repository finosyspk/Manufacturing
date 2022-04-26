const AppConfig = require('./../../AppConfig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

exports.Allocation = async (db, model, TransNo, TransDate, TransType,LocationCode) => {
    try {

        let DetailData = await model.findAll({where : { TransNo : TransNo}})

        let UPD = "EXEC [dbo].[UpdateParallelData]"
        let AllocArray = []
        let AllocTemp = [];
        let Alloc;
        let Temp;
 
        await db.INV_StockAlloc.destroy({ where: { TransNo: TransNo } })
        // await db.AlLocationTemp.destroy({ where: { TransNo: TransNo } })
        // await db.sequelize.query(UPD)

        let StockData = await db.INV_StockMaster.findAll({
            where: {
                LocationCode: LocationCode
            },
            attributes: ['INV_StockMaster.HeaderNo', 'INV_StockMaster.LocationCode', 'INV_StockMaster.ItemCode', 'INV_StockMaster.Location', 'INV_StockMaster.Item', 'INV_StockMaster.ItemTrackBy', 'INV_StockMaster.BatchNo',
                'Quantity', 'UnitPrice', 'AvgCost', 'ExpiryDate',
                [db.Sequelize.literal('SUM(ISNULL(INV_StockAllocs.QtyOut,0))'), 'QtyAlloc'],
                [db.Sequelize.literal('SUM(ISNULL(INV_StockDetails.QtyOut,0))'), 'QtyOut'],
                [db.Sequelize.literal('Quantity - (SUM(ISNULL(INV_StockAllocs.QtyOut,0)) + SUM(ISNULL(INV_StockDetails.QtyOut,0)))'), 'QtyBal']
            ],
            include: [{
                model: db.INV_StockAlloc,
                required: false,
                attributes: [],
                where: {
                    TransNo: TransNo
                }
            }, {
                model: db.INV_StockDetail,
                required: false,
                attributes: []
            }],
            raw: true,
            group: ['INV_StockMaster.HeaderNo', 'INV_StockMaster.LocationCode', 'INV_StockMaster.ItemCode', 'INV_StockMaster.Location', 'INV_StockMaster.Item', 'INV_StockMaster.ItemTrackBy', 'INV_StockMaster.BatchNo',
                'Quantity', 'UnitPrice', 'AvgCost', 'ExpiryDate'],
            having: [
                {},
                db.Sequelize.literal(
                    'Quantity > (SUM(ISNULL(INV_StockAllocs.QtyOut,0)) + SUM(ISNULL(INV_StockDetails.QtyOut,0)))'
                )
            ]
        })

        StockData = JSON.stringify(StockData);
        StockData = JSON.parse(StockData);

        await Promise.all(
            DetailData.map(function (val) {
                let QtyReq = 0
                let QtyFul = 0
                let QtyLine = 0
                if (val.ItemType === 'Inventoried Item') {
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
                            if (val.ItemCode === itm.ItemCode) {
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
                                    LineNo: val.TLineSeq
                                }
                                AllocArray.push(Alloc)

                                // Temp = {
                                //     HeaderNo: itm.HeaderNo,
                                //     LocationCode: val.LocationCode,
                                //     ItemCode: val.ItemCode,
                                //     BatchNo: '',
                                //     TransType: val.TransType,
                                //     TransNo: val.TransNo,
                                //     TransDate: val.TransDate,
                                //     QtyOut: val.Quantity,
                                //     QtyPass: QtyLine,
                                //     QtyFail: 0,
                                //     LineNo: val.TLineSeq,
                                //     Status: 'Pass'
                                // }

                                // AllocTemp.push(Temp)

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
                }

            })
        );

        // await db.AlLocationTemp.bulkCreate(AllocTemp)

        // let FailData = await db.AlLocationTemp.findAll({
        //     where: {
        //         TransNo: TransNo
        //     },
        //     transaction: t
        // })

        // FailData = JSON.stringify(FailData);
        // FailData = JSON.parse(FailData);
        let FailCount = 0

        // FailData.map(function (val1) {
        //     if (val1.Status === 'Fail') {
        //         FailCount += 1;
        //     }
        // })

        // FailData.map(function (val) {
        //     val.FailCount = FailCount
        //     val.StatusCode = val.Status === 'Pass' ? 1 : 0;
        //     val.LineStatus = val.Status;
        //     val.TransQty = val.QtyFail;

        //     return val;
        // })

        if (FailCount > 0) {
            await db.INV_StockAlloc.destroy({
                where: {
                    TransNo: TransNo
                },
                transaction: t
            })
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
            await db.INV_StockAlloc.bulkCreate(AllocArray)
            // await db.sequelize.query(UPD)
            return { Success: true, Message: "Allocation Process Completed!", data: [] }
        }
    }
    catch (ex) {
        console.log(ex)
        return { Success: false, Message: "Allocation Process RollBacked!", data: resp }
    }
};