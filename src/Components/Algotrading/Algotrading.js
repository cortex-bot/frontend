// Import the necessary dependencies
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import {
  Button,
  Paper,
  Switch,
  FormLabel,
  Typography,
} from "@material-ui/core";
import HighchartsDependencies from "../../utils/HighchartDependencies";
import Editor from "./Editor";
import Panel from "./Panel";
import TradeChart from "./TradeChart";
import { StrategySelector } from "./StrategySelector";
import { template } from "./default_template.json";
import "./Algotrading.css";

// Utility function to get stock market open time
const getStockMarketOpenTime = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);
  currentDate.setHours(9);
  currentDate.setMinutes(15);
  return currentDate.toLocaleString();
};

// Utility function to get stock market end time
const getStockMarketEndTime = () => {
  const currentDate = new Date();
  currentDate.setHours(15);
  currentDate.setMinutes(30);
  return currentDate.toLocaleString();
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
  const updateCandleStickChart = (e) => {
    setIsCandleStickChart(e.target.checked);
  };

  return (
    <div className="m-1 p-0 min-h-screen flex flex-col">
      <Helmet>
        <HighchartsDependencies /> {/* External Highcharts dependencies */}
      </Helmet>

      <div className="m-1 grid md:grid-cols-1 lg:grid-cols-4 gap-4 flex-grow">
        {/* Chart component */}
        <div className="col-span-1 lg:col-span-3">
          <div
            className="h-96 lg:h-full bg-transparent border border-gray-300 rounded-md overflow-hidden"
            style={{ maxHeight: "55vh" }}
          >
            {TradeChart(formValues, trades, "h-100 w-100", isCandleStickChart)}
          </div>
        </div>

        {/* Analysis component */}
        <div className="col-span-1 lg:col-span-1 flex flex-col">
          <div className="text-center font-semibold text-heading mb-3">
            Analysis
          </div>
          <div className="flex-grow overflow-x-auto">
            {analysis ? (
              <div className="table-report">
                {Object.keys(analysis).map((key) => (
                  <div className="table-row" key={key}>
                    <div className="key">{key}</div>
                    <div className="value">
                      {typeof analysis[key] === "number"
                        ? Math.round(analysis[key] * 1000) / 1000
                        : String(analysis[key])}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500">Strategy not executed yet</div>
            )}
          </div>

          {/* Toggle button for line chart and candlestick visualization */}
          <div className="mt-4">
            <Paper className="p-2 flex mb-0">
              Candle Stick Chart
              <Switch
                checked={isCandleStickChart}
                name="enable candle stick chart"
                onChange={updateCandleStickChart}
                label="enable candle stick chart"
              />
            </Paper>
          </div>
        </div>
      </div>
    

<div id="filter_code_panel" className="grid md:grid-cols-1 lg:grid-cols-4 gap-4 md:h-100">
  <div className="col-span-1 lg:col-span-3 ">
    <Editor code={code} setCode={setCode} />
  </div>

  <div className="col-span-1 lg:col-span-1 rounded-md shadow-md">
    <StrategySelector setCode={setCode} formValues={formValues} setFormValues={setFormValues} />
    <Panel
      username="alvin369"
      formValues={formValues}
      setFormValues={setFormValues}
      code={code}
      settrades={setTrades}
      setAnalysis={setAnalysis}
      description={null}
    />
  </div>
</div>
</div>

);
}

export default Algotrading;