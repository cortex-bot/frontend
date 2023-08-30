export const getColumns = (data) => {
    let columnsGenerated = [];

    Object.keys(data[0]).map((key) => {
      if (key != "tableData") {
        // alert table data column needs to be removed
        let d = {};
        d["title"] = key;
        d["field"] = key;
        columnsGenerated.push(d);
      }
    });
    console.log("columnsGenerated", columnsGenerated);
  
    return columnsGenerated;
  };

  export const getActiveExecutorColumns = () => {
    let columnsGenerated = [];
    columnsGenerated.push({"title": "Executor Id", "field": "executor_id"})
    columnsGenerated.push({"title": "Status", "field": "status"})
    return columnsGenerated;
  }

  export const extractActiveExecutorData = (data) => {
    let columnsGenerated = [];

    Object.keys(data[0]).map((key) => {
      if (key != "tableData") {
        // alert table data column needs to be removed
        let d = {};
        d["title"] = key;
        d["field"] = key;
        columnsGenerated.push(d);
      }
    });
    console.log("columnsGenerated", columnsGenerated);
  
    return columnsGenerated;
  };



  export const extractTradeSingals = (data) =>{
    let response = [];

    data.forEach(element => {
     if( element.trades != null){
      element.trades.forEach(trades =>{
        trades["stock_name"] = element.stock_name
        delete trades["stop_loss"];
        response.push(trades)
      })
    
     }
    });
    return response;
  }
