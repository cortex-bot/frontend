// Import the necessary dependencies
import React, { useState } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Helmet } from 'react-helmet';
import {
  Button,
  Paper,
  Switch,
  FormLabel,
  Typography,
} from '@material-ui/core';
// @ts-expect-error TS(6142): Module '../../utils/HighchartDependencies' was res... Remove this comment to see the full error message
import HighchartsDependencies from '../../utils/HighchartDependencies';
// @ts-expect-error TS(6142): Module './Editor' was resolved to 'D:/workspace/pr... Remove this comment to see the full error message
import Editor from './Editor';
// @ts-expect-error TS(6142): Module './Panel' was resolved to 'D:/workspace/pro... Remove this comment to see the full error message
import Panel from './Panel';
// @ts-expect-error TS(6142): Module './TradeChart' was resolved to 'D:/workspac... Remove this comment to see the full error message
import TradeChart from './TradeChart';
// @ts-expect-error TS(6142): Module './StrategySelector' was resolved to 'D:/wo... Remove this comment to see the full error message
import { StrategySelector } from './StrategySelector';
// @ts-expect-error TS(2732): Cannot find module './default_template.json'. Cons... Remove this comment to see the full error message
import { template } from './default_template.json';
import './Algotrading.css';

// Utility function to get stock market open time
const getStockMarketOpenTime = () => {
  const currentDate = new Date();
  const yesterday = new Date(currentDate)
  yesterday.setDate(currentDate.getDate() - 1);
  yesterday.setHours(9, 15);
  return yesterday.toLocaleString('sv');
};

// Utility function to get stock market end time
const getStockMarketEndTime = () => {
  const currentDate = new Date();
  currentDate.setHours(15, 30);
  return currentDate.toLocaleString('sv');
};

// Default values for the form
const defaultValues = {
  stock_name: 'ONGC',
  start_date: getStockMarketOpenTime(),
  end_date: getStockMarketEndTime(),
  strategy_name: 'Random',
  ranking: false,
  description: '',
  stock_basket: null,
  interval: '5m',
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
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="m-1 p-0 min-h-screen flex flex-col">
      <Helmet>
        <HighchartsDependencies /> {/* External Highcharts dependencies */}
      </Helmet>

      <div className="m-1 grid md:grid-cols-1 lg:grid-cols-4 gap-4 flex-grow">
        {/* Chart component */}
        <div className="col-span-1 lg:col-span-3">
          <div
            className="h-96 lg:h-full bg-transparent border border-gray-300 rounded-md overflow-hidden"
            style={{ maxHeight: '55vh' }}
          >
            {TradeChart(formValues, trades, 'h-100 w-100', isCandleStickChart)}
          </div>
        </div>

        {/* Analysis component */}
        <div className="col-span-1 lg:col-span-1 flex flex-col">
          <div className="text-center font-semibold text-heading mb-3">
            Analysis
          </div>
          <div className="flex-grow overflow-x-auto">
            {analysis ? (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className="table-report">
                {Object.keys(analysis).map((key) => (
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <div className="table-row" key={key}>
                    <div className="key">{key}</div>
                    <div className="value">
                      {typeof analysis[key] === 'number'
                        ? Math.round(analysis[key] * 1000) / 1000
                        : String(analysis[key])}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
                // @ts-expect-error TS(2322): Type '{ checked: boolean; name: string; onChange: ... Remove this comment to see the full error message
                label="enable candle stick chart"
              />
            </Paper>
          </div>
        </div>
      </div>

      {/*// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div
        id="filter_code_panel"
        className="grid md:grid-cols-1 lg:grid-cols-4 gap-4 md:h-100"
      >
        <div className="col-span-1 lg:col-span-3 ">
          <Editor code={code} setCode={setCode} />
        </div>

        <div className="col-span-1 lg:col-span-1 rounded-md shadow-md">
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
        </div>
      </div>
    </div>
  );
}

export default Algotrading;
