import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TradeDetails from './TradeDetails';
import './SignalsDashboard.css';
import ReactModal from 'react-modal';
import { getColumns, extractTradeSingals } from "../../utils/utils.js";


import { Button } from "@material-ui/core";
import MuiTable from '../../utils/MuiTable';

import { host, getAllSignalList, deleteSignalData } from '../../configs.json';

ReactModal.setAppElement('#root');

const handleDeleteSignal = async (signalId, username) => {
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

  const renderButton = (params, isSummary) => {
    const color = isSummary ? "#c5aa20" : "primary";
    const label = isSummary ? "Summary" : "Report";
  
    return (
      <Button
        variant="contained"
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
  
  const handleSignalClick = (signal, isSummaryFlag) => {
    setSelectedSignal(signal);
    setIsSummary(isSummaryFlag);
  };
  
  const handleModalClose = () => {
    setSelectedSignal(null);
    setIsSummary(null);
  };
  
  const notFound = <div className="loading">Loading data</div>;
  
  const renderDeleteButton = (params) => {
    return (
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
  
  const renderSummaryButton = (params) => {
    return renderButton(params, true);
  };
  
  const renderReportButton = (params) => {
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
    <div className='signals-dashboard'>
    {tradeSignals && columns ? MuiTable('Trade Signals', tradeSignals, columns) : notFound}

      {selectedSignal && (
        <TradeDetails signal={selectedSignal} isOpen={true} onRequestClose={handleModalClose} isSummary ={isSummary} />
      )}
    </div>
  );
};

export default SignalsDashboard;
