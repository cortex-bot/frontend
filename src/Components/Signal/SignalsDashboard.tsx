import React, { useState, useEffect } from 'react';
import axios from 'axios';
// @ts-expect-error TS(6142): Module './TradeDetails' was resolved to 'D:/worksp... Remove this comment to see the full error message
import TradeDetails from './TradeDetails';
import './SignalsDashboard.css';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import ReactModal from 'react-modal';
import { getColumns, extractTradeSingals } from "../../utils/utils";


import { Button } from "@material-ui/core";
import MuiTable from '../../utils/MuiTable';

// @ts-expect-error TS(2732): Cannot find module '../../configs.json'. Consider ... Remove this comment to see the full error message
import { host, getAllSignalList, deleteSignalData } from '../../configs.json';

ReactModal.setAppElement('#root');

const handleDeleteSignal = async (signalId: any, username: any) => {
  try {
    const response = await axios.post(host + deleteSignalData, {
      signal_id: signalId,
      username: username,
      broker_name: 'PAPER_TRADING',
    });
    // Handle the response as needed
    console.log('Signal deleted:', response.data);
    // Optionally, you can also fetch updated trade signals after deleting the bucket
    // fetchTradeSignals();
    // window.location.reload();
  } catch (error) {
    console.error('Error deleting Signal:', error);
  }
};

const SignalsDashboard = () => {
  const [tradeSignals, setTradeSignals] = useState([]);
  const [selectedSignal, setSelectedSignal] = useState(null);
  const [isSummary, setIsSummary] = useState(null);
  const [columns, setColumns] = useState([]);


  useEffect(() => {
    fetchTradeSignals();
  }, []);

  const fetchTradeSignals = async () => {
    try {
      const response = await axios.get(host + getAllSignalList); // Replace with your API endpoint
      setTradeSignals(response.data);
      console.log("Trade signals dasbhboard data ",response.data)
      var cols = getColumns(response.data);
      cols.push(...additionalColumn);
      setColumns(cols);
      
    } catch (error) {
      console.error('Error fetching trade signals:', error);
    }
  };
  // import { Button } from "@material-ui/core";

  const renderButton = (params: any, isSummary: any) => {
    const color = isSummary ? "#c5aa20" : "primary";
    const label = isSummary ? "Summary" : "Report";
  
    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Button
        variant="contained"
        // @ts-expect-error TS(2769): No overload matches this call.
        color={color}
        onClick={(e) => {
          e.stopPropagation();
          handleSignalClick(params, isSummary);
        }}
      >
        {label}
      </Button>
    );
  };
  
  const handleSignalClick = (signal: any, isSummaryFlag: any) => {
    setSelectedSignal(signal);
    setIsSummary(isSummaryFlag);
  };
  
  const handleModalClose = () => {
    setSelectedSignal(null);
    setIsSummary(null);
  };
  
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  const notFound = <div className="loading">Loading data</div>;
  
  const renderDeleteButton = (params: any) => {
    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Button
        variant="contained"
        color="secondary"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteSignal(params.signal_id, localStorage.getItem("username"));
        }}
      >
        Delete
      </Button>
    );
  };
  
  const renderSummaryButton = (params: any) => {
    return renderButton(params, true);
  };
  
  const renderReportButton = (params: any) => {
    return renderButton(params, false);
  };
  

  const additionalColumn = [
    {
      title: 'Report', field: 'detailedReport',
      render: renderReportButton,
      disableClickEventBubbling: true,
    },{
    title: 'Summary', field: 'summaryReport',
    render: renderSummaryButton,
    disableClickEventBubbling: true,
  },{
    title: 'Delete', field: 'deactivate',
    render: renderDeleteButton,
    disableClickEventBubbling: true,
  }] 



  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className='signals-dashboard'>
    {tradeSignals && columns ? MuiTable('Trade Signals', tradeSignals, columns) : notFound}

      {selectedSignal && (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <TradeDetails signal={selectedSignal} isOpen={true} onRequestClose={handleModalClose} isSummary ={isSummary} />
      )}
    </div>
  );
};

export default SignalsDashboard;
