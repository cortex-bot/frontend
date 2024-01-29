import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./TradeDetails.css";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import {
  host,
  getSignalData,
  getSignalSummaryReport,
  // @ts-expect-error TS(2732): Cannot find module '../../configs.json'. Consider ... Remove this comment to see the full error message
} from "../../configs.json";
import MuiTable from "../common/Table/MuiTable";
import { getColumns, extractTradeSingals } from "../../utils/utils";
import {
  createTheme,
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
  IconButton,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

const dialogContentTheme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          minHeight: "0",
          display: "flex",
          flexDirection: "column",
        },
      },
    },
  },
});

const TradeDetails = ({ signal, isOpen, onRequestClose, isSummary }: any) => {
  const [tradeData, setTradeData] = useState([]);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const fetchTradeData = useCallback(
    async (isSummary: any) => {
      try {
        let response;
        var cols;
        if (isSummary) {
          response = await axios.get(host + getSignalSummaryReport, {
            params: { request: signal.signal_id },
          });
          console.log("fetchTradeData summary active ", response);

          setData(response.data);
          cols = getColumns(response.data);
        } else {
          response = await axios.get(host + getSignalData, {
            params: { request: signal.signal_id },
          });

          setData(extractTradeSingals(response.data.report));
          cols = getColumns(extractTradeSingals(response.data.report));
        }

        setTradeData(response.data);
        // console.log("response trade data", extractTradeSingals(response.data.report));

        setColumns(cols);
        console.log("column ", cols);
      } catch (error) {
        console.error("Error fetching trade details:", error);
      }
    },
    [signal?.signal_id]
  );

  useEffect(() => {
    fetchTradeData(isSummary);
  }, [fetchTradeData, isSummary]);

  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  const notFound = <div className="loading">Loading data</div>;

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Dialog
      maxWidth={"xl"}
      open={isOpen}
      onClose={onRequestClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: "20px",
          pt: "10px",
          pb: "0",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Trade Details</Typography>
        <IconButton aria-label="close" onClick={onRequestClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <ThemeProvider theme={dialogContentTheme}>
        <DialogContent dividers sx={{ p: "0", display: "flex" }}>
          {data && columns ? (
            <MuiTable
              title={`Signal id ${signal?.signal_id}`}
              data={data}
              columns={columns}
              config={{
                zIndex: 10,
              }}
            />
          ) : (
            notFound
          )}
        </DialogContent>
      </ThemeProvider>
    </Dialog>
  );
};

export default TradeDetails;
