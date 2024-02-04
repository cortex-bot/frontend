import React from "react";
// @ts-expect-error TS(2732): Cannot find module '../../configs.json'. Consider ... Remove this comment to see the full error message
import {
  host,
  activeExecutorsList,
  updateExecutorStatus,
  deactivateExecutor,
} from "../../configs.json";
import { getColumns, getActiveExecutorColumns } from "../../utils/utils";
import MuiTable from "../common/Table/MuiTable";
import { useEffect, useState } from "react";
import axios from "axios";

import { Box, Button } from "@mui/material";
import { useGetActiveExecutors } from "../../api/executor/requests";
import { EXECUTOR_COLUMNS } from "./consts";

function updateExecutorStatusApi(executorId: any, status: any) {
  const FetchURL = host + updateExecutorStatus;
  let payload = {};
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  payload["status"] = status;
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  payload["executor_id"] = executorId;

  console.log("executor id is " + executorId);

  axios.post(FetchURL, payload).then((response) => {
    if (response.data.status != "SUCCESS")
      alert("Executor Id " + executorId + " not updated");
  });
}

function parseList(list: any) {
  if (!Array.isArray(list)) {
    return []; // Return an empty array if the input is not an array
  }

  return list.map((obj) => {
    const { status, executor_id, data } = obj;
    const { strategy_name, executor_start_time } = data;
    return { executor_start_time, status, executor_id, strategy_name };
  });
}

function deactivateExecutorApi(executorId: any) {
  const FetchURL = host + deactivateExecutor;

  axios.post(FetchURL, { executor_id: executorId }).then((response) => {
    if (response.data.status != "SUCCESS")
      alert("Executor Id " + executorId + " not deactivated");
  });
  // (async () => {
  //   const result = await axios.post(FetchURL,{"executor_id":executorId});
  //   if(result.data.status != "SUCCESS")
  //   alert("Executor Id "+executorId+" not deactivated");
  // })();
}

function ActiveExecutors() {
  const { data: activeExecutorsList } = useGetActiveExecutors();

  const executorIdName = "executor_id";

  const renderPauseButton = (params: any) => {
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (
      <Button
        variant="contained"
        color="warning"
        onClick={(event) => {
          updateExecutorStatusApi(params[executorIdName], "PAUSE");
        }}
      >
        PAUSE{" "}
      </Button>
    );
  };

  const renderDeactivateButton = (params: any) => {
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (
      <Button
        variant="contained"
        // @ts-expect-error TS(2769): No overload matches this call.
        color="error"
        onClick={(event) => {
          deactivateExecutorApi(params[executorIdName]);
        }}
      >
        Deactivate{" "}
      </Button>
    );
  };

  const getActionColumns = () => {
    return [
      {
        title: "Update Status",
        render: renderPauseButton,
      },
      {
        title: "Deactivate Executor",
        render: renderDeactivateButton,
      },
    ];
  };

  const getColumns = () => {
    return [...EXECUTOR_COLUMNS, ...getActionColumns()];
  };

  return (
    <Box sx={{ flexBasis: "0", flexGrow: "1", minHeight: "400px" }}>
      <MuiTable
        title={"Active Executors"}
        data={activeExecutorsList}
        columns={getColumns()}
      />
    </Box>
  );
}

export default ActiveExecutors;
