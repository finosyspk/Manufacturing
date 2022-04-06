

exports.NextNo = async function (db,FormName,t) {
    try {
        let NextNo
        let TransType = await db.MOP_NextNo.findOne({ where: { TransID: FormName },transaction:t })
        NextNo = TransType.NextNo;
        let response = NextNo.split("-");
        let newNo = ("0".repeat(parseInt(TransType.DocLength) - 1) + (parseInt(response[1]) + 1)).slice(
            parseInt(TransType.DocLength) * -1
        );
        let NextTransNo = response[0] + "-" + newNo;

        await db.MOP_NextNo.update({NextNo: NextTransNo}, { where: { TransID: FormName },transaction:t })
                
        return NextNo;
    }
    catch (ex) {
        console.log(ex)
        return ""
    }
};