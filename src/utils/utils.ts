export const getColumns = (data: any) => {
  let columnsGenerated: any = [];

  Object.keys(data[0]).map((key) => {
    if (key != 'tableData') {
      // alert table data column needs to be removed
      let d = {};
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      d['title'] = key;
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      d['field'] = key;
      columnsGenerated.push(d);
    }
  });
  console.log('columnsGenerated', columnsGenerated);

  return columnsGenerated;
};

export const getActiveExecutorColumns = () => {
  let columnsGenerated = [];
  columnsGenerated.push({ title: 'Executor Id', field: 'executor_id' });
  columnsGenerated.push({ title: 'Status', field: 'status' });
  return columnsGenerated;
};

export const extractActiveExecutorData = (data: any) => {
  let columnsGenerated: any = [];

  Object.keys(data[0]).map((key) => {
    if (key != 'tableData') {
      // alert table data column needs to be removed
      let d = {};
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      d['title'] = key;
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      d['field'] = key;
      columnsGenerated.push(d);
    }
  });
  console.log('columnsGenerated', columnsGenerated);

  return columnsGenerated;
};

export const extractTradeSingals = (data: any) => {
  let response: any = [];

  data.forEach((element: any) => {
    if (element.trades != null) {
      element.trades.forEach((trades: any) => {
        trades['stock_name'] = element.stock_name;
        delete trades['stop_loss'];
        response.push(trades);
      });
    }
  });
  return response;
};
