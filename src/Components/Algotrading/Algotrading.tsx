// Import the necessary dependencies
import React, { useState } from "react";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Helmet } from "react-helmet";
import {
  Button,
  Paper,
  Switch,
  FormLabel,
  Typography,
  Box,
  Grid,
} from "@mui/material";
// @ts-expect-error TS(6142): Module '../../utils/HighchartDependencies' was res... Remove this comment to see the full error message
import HighchartsDependencies from "../../utils/HighchartDependencies";
// @ts-expect-error TS(6142): Module './Editor' was resolved to 'D:/workspace/pr... Remove this comment to see the full error message
import Editor from "./Editor";
// @ts-expect-error TS(6142): Module './Panel' was resolved to 'D:/workspace/pro... Remove this comment to see the full error message
import Panel from "./Panel";
// @ts-expect-error TS(6142): Module './TradeChart' was resolved to 'D:/workspac... Remove this comment to see the full error message
import TradeChart from "./TradeChart";
// @ts-expect-error TS(6142): Module './StrategySelector' was resolved to 'D:/wo... Remove this comment to see the full error message
import { StrategySelector } from "./StrategySelector";
// @ts-expect-error TS(2732): Cannot find module './default_template.json'. Cons... Remove this comment to see the full error message
import { template } from "./default_template.json";
import "./styles/Algotrading.css";
import { map } from "lodash";
import AnalysisBox from "./AnalysisBox";

// Utility function to get stock market open time
const getStockMarketOpenTime = () => {
  const currentDate = new Date();
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);
  yesterday.setHours(9, 15);
  return yesterday.toLocaleString("sv");
};

// Utility function to get stock market end time
const getStockMarketEndTime = () => {
  const currentDate = new Date();
  currentDate.setHours(15, 30);
  return currentDate.toLocaleString("sv");
};

// Default values for the form
const defaultValues = {
  stock_name: "ONGC",
  start_date: getStockMarketOpenTime(),
  end_date: getStockMarketEndTime(),
  strategy_name: "Random",
  ranking: false,
  description: "",
  stock_basket: null,
  interval: "5m",
};

function Algotrading() {
  // State variables
  const [formValues, setFormValues] = useState(defaultValues);
  const [strategy, setStrategy] = useState(null);
  const [code, setCode] = useState(template);
  const [trades, setTrades] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isCandleStickChart, setIsCandleStickChart] = useState(true);

  // Function to toggle the candlestick chart visualization
  const updateCandleStickChart = (e: any) => {
    setIsCandleStickChart(e.target.checked);
  };

  return (
    <Grid container spacing={2} sx={{ p: "10px", height: "100vh" }}>
      <Grid item xs={12} sm={9} sx={{ height: "50%" }}>
        <TradeChart
          formValues={formValues}
          trades={trades}
          isCandleStickChart={isCandleStickChart}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "50%",
          gap: "10px",
        }}
      >
        <AnalysisBox analysis={analysis} />
        <Paper sx={{ display: "flex", alignItems: "center", px: "1rem" }}>
          <Typography>Candle Stick Chart</Typography>
          <Switch
            checked={isCandleStickChart}
            name="enable candle stick chart"
            onChange={updateCandleStickChart}
            label="enable candle stick chart"
          />
        </Paper>
      </Grid>

      <Grid item xs={12} sm={9} sx={{ height: "50%" }}>
        <Editor code={code} setCode={setCode} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={3}
        sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <StrategySelector
          setCode={setCode}
          formValues={formValues}
          setFormValues={setFormValues}
        />
        <Panel
          username="alvin369"
          formValues={formValues}
          setFormValues={setFormValues}
          code={code}
          settrades={setTrades}
          setAnalysis={setAnalysis}
          description={null}
        />
      </Grid>
    </Grid>
  );
}

export default Algotrading;
