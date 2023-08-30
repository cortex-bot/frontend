import React from 'react'
import { host, activeExecutorsList, updateExecutorStatus,deactivateExecutor } from "../../configs.json";
import { getColumns,getActiveExecutorColumns } from "../../utils/utils";
import MuiTable from '../../utils/MuiTable'
import { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "@material-ui/core";
import { log } from '@craco/craco/lib/logger';


function updateExecutorStatusApi(executorId,status){

    

    const FetchURL = host + updateExecutorStatus;
    let payload = {}
    payload['status'] = status;
    payload['executor_id'] = executorId;

    console.log("executor id is "+executorId);

    axios.post(FetchURL,payload).then(response => {

      if(response.data.status != "SUCCESS") 
      alert("Executor Id "+executorId+" not updated");
    }
    )


}

function parseList(list) {

  if (!Array.isArray(list)) {
    return []; // Return an empty array if the input is not an array
  }

  return list.map(obj => {
    const { status, executor_id,data } = obj;
    const {strategy_name,executor_start_time}  =data;
    return {executor_start_time, status, executor_id,strategy_name };
  });
}

function deactivateExecutorApi(executorId){

    const FetchURL = host + deactivateExecutor;

    axios.post(FetchURL,{"executor_id":executorId}).then(response => {

      if(response.data.status != "SUCCESS") 
      alert("Executor Id "+executorId+" not deactivated");
    }
    )
    // (async () => {
    //   const result = await axios.post(FetchURL,{"executor_id":executorId});
    //   if(result.data.status != "SUCCESS") 
    //   alert("Executor Id "+executorId+" not deactivated");
    // })();
  
}

function ActiveExecutors() {
    const [data, setdata] = useState([]);
    const [columns, setcolumns] = useState([]);

    const executorIdName = "executor_id";
    
    const renderPauseButton = (params) => {
    
        return (<Button variant="contained"
          color="primary"
          onClick={(event) => {
            updateExecutorStatusApi(params[executorIdName],"PAUSE")
          }}    
           >
          PAUSE </Button>);
      }


      const renderDeactivateButton = (params) => {
    
        return (<Button variant="contained"
          color="danger"
          onClick={(event) => {
            deactivateExecutorApi(params[executorIdName])
          }}    
           >
          Deactivate </Button>);
      }

    const additionalColumn = [{
        title: 'Update Status', field: 'updateStatus',
        render: renderPauseButton,
        disableClickEventBubbling: true,
      },{
        title: 'Deactivate Executor', field: 'deactivate',
        render: renderDeactivateButton,
        disableClickEventBubbling: true,
      }] 

      

  useEffect(() => {
    const FetchURL = host + activeExecutorsList;
    (async () => {

      var result = await axios(FetchURL);
      console.log("result data",result);
      result = parseList(result.data);

      console.log("result data updated ",result);
      if(result.length === 0) {
        console.log("null data");
        return;
      }
      
      setdata(result);

      var cols = getColumns(result);
      cols.push(...additionalColumn);

      setcolumns(cols);
    })();
  }, []);


  const notFound = <div className="loading">Loading data</div>;

  return (
    <div>
        {data && columns ? MuiTable("Active Executors", data, columns) : notFound}
    </div>
  )
}

export default ActiveExecutors;