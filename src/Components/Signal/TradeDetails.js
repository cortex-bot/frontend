import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TradeDetails.css';
import ReactModal from 'react-modal';
import {
  host,
  getSignalData,
  getSignalSummaryReport
} from "../../configs.json";
import MuiTable from '../../utils/MuiTable';
import { getColumns, extractTradeSingals } from "../../utils/utils.js";

const TradeDetails = ({ signal, isOpen, onRequestClose, isSummary}) => {
  const [tradeData, setTradeData] = useState([]);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetchTradeData(isSummary);
  }, []);

  const fetchTradeData = async (isSummary) => {
    try {
      let response;
      var cols ;
      if(isSummary){
        response =  await axios.get(host + getSignalSummaryReport, { params: { request: signal.signal_id } });
        console.log("fetchTradeData summary active ",response);

      setData(response.data);
      cols = getColumns(response.data);
      }else{
        response = await axios.get(host + getSignalData, { params: { request: signal.signal_id } });

      setData(extractTradeSingals(response.data.report));
       cols = getColumns(extractTradeSingals(response.data.report));
      }
      
      setTradeData(response.data);
      // console.log("response trade data", extractTradeSingals(response.data.report));

      setColumns(cols);
      console.log("column ", cols);
    } catch (error) {
      console.error('Error fetching trade details:', error);
    }
  };

  const notFound = <div className="loading">Loading data</div>;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Trade Details"
      className="trade-details-modal"
      overlayClassName="modal-overlay"
    >
      {/* Set z-index for the modal header */}
      <div className="modal-header" >
        <h2>Trade Details</h2>
        <button onClick={onRequestClose} className="cut-button">
          &#10005;
        </button>
      </div>
      {data && columns ? MuiTable(`Signal id ${signal.signal_id}`, data, columns,{zIndex:10}) : notFound}
    </ReactModal>
  );
  
};

export default TradeDetails;
