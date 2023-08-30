import React from 'react';
// @ts-expect-error TS(2732): Cannot find module '../../configs.json'. Consider ... Remove this comment to see the full error message
import {
  host,
  activeExecutorsList,
  updateExecutorStatus,
  deactivateExecutor,
} from '../../configs.json';
import { getColumns, getActiveExecutorColumns } from '../../utils/utils';
import MuiTable from '../../utils/MuiTable';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { Button } from '@material-ui/core';
// @ts-expect-error TS(7016): Could not find a declaration file for module '@cra... Remove this comment to see the full error message
import { log } from '@craco/craco/lib/logger';

function updateExecutorStatusApi(executorId: any, status: any) {
  const FetchURL = host + updateExecutorStatus;
  let payload = {};
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  payload['status'] = status;
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  payload['executor_id'] = executorId;

  console.log('executor id is ' + executorId);

  axios.post(FetchURL, payload).then((response) => {
    if (response.data.status != 'SUCCESS')
      alert('Executor Id ' + executorId + ' not updated');
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
    if (response.data.status != 'SUCCESS')
      alert('Executor Id ' + executorId + ' not deactivated');
  });
  // (async () => {
  //   const result = await axios.post(FetchURL,{"executor_id":executorId});
  //   if(result.data.status != "SUCCESS")
  //   alert("Executor Id "+executorId+" not deactivated");
  // })();
}

function ActiveExecutors() {
  const [data, setdata] = useState([]);
  const [columns, setcolumns] = useState([]);

  const executorIdName = 'executor_id';

  const renderPauseButton = (params: any) => {
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={(event) => {
          updateExecutorStatusApi(params[executorIdName], 'PAUSE');
        }}
      >
        PAUSE{' '}
      </Button>
    );
  };

  const renderDeactivateButton = (params: any) => {
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (
      <Button
        variant="contained"
        // @ts-expect-error TS(2769): No overload matches this call.
        color="danger"
        onClick={(event) => {
          deactivateExecutorApi(params[executorIdName]);
        }}
      >
        Deactivate{' '}
      </Button>
    );
  };

  const additionalColumn = [
    {
      title: 'Update Status',
      field: 'updateStatus',
      render: renderPauseButton,
      disableClickEventBubbling: true,
    },
    {
      title: 'Deactivate Executor',
      field: 'deactivate',
      render: renderDeactivateButton,
      disableClickEventBubbling: true,
    },
  ];

  useEffect(() => {
    const FetchURL = host + activeExecutorsList;
    (async () => {
      var result = await axios(FetchURL);
      console.log('result data', result);
      // @ts-expect-error TS(2739): Type '{ executor_start_time: any; status: any; exe... Remove this comment to see the full error message
      result = parseList(result.data);
      console.log('result data updated ', result);
      if ((result as any).length === 0) {
        console.log('null data');
        return;
      }
      // @ts-expect-error TS(2345): Argument of type 'AxiosResponse<any, any>' is not ... Remove this comment to see the full error message
      setdata(result);
      var cols = getColumns(result);
      cols.push(...additionalColumn);
      setcolumns(cols);
    })();
  }, []);

  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  const notFound = <div className="loading">Loading data</div>;

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div>
      {/* @ts-expect-error TS(2322): Type 'Element | { title: any; }' is not assignable... Remove this comment to see the full error message */}
      {data && columns ? MuiTable('Active Executors', data, columns) : notFound}
    </div>
  );
}

export default ActiveExecutors;
