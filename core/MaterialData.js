exports.Register = async (data, columns) => {
  try {
    let column = [];
    let obj = data[0];
    if (data.length > 0){
      let ObjArr = Object.keys(obj);
      columns.map((val) => {
        let fltr = ObjArr.filter((val1) =>
          (val1 === typeof val) === "string" ? val : val[0]
        );
        if (fltr.length > 0) {
          let objtitle = typeof val === "string" ? titleCase(val) : val[1];
          let objfield = typeof val === "string" ? val : val[0];
          let objtext = typeof obj[val] === "number" ? "right" : "left";
  
          let Item = {
            title: objtitle,
            field: objfield,
            headerStyle: {
              paddingTop: 1,
              paddingBottom: 1,
              textAlign: "center",
            },
            cellStyle: {
              paddingTop: 1,
              paddingBottom: 1,
              textAlign: "center",
            },
          };
          column.push(Item);
        }
      });
  
      return {
        columns: column,
        rows: data,
      };
    }
    else {
      columns.map((val) => {
          let objtitle = typeof val === "string" ? titleCase(val) : val[1];
          let objfield = typeof val === "string" ? val : val[0];
          let objtext = typeof val === "number" ? "right" : "left";
  
          let Item = {
            title: objtitle,
            field: objfield,
            headerStyle: {
              paddingTop: 1,
              paddingBottom: 1,
              textAlign: "center",
            },
            cellStyle: {
              paddingTop: 1,
              paddingBottom: 1,
              textAlign: "center",
            },
          };
          column.push(Item);
      });
      return {
        columns: column,
        rows: data,
      };
    }

  } catch (err) {
    console.log(err);
  }
};

function titleCase(str) {
  str = str.replace(/([A-Z]+)/g, " $1").trim();
  str = str.replace("_", " ");
  return str;
}