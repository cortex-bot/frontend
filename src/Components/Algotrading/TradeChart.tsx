import React, { useMemo, useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import indicatorsAll from "highcharts/indicators/indicators-all";
import annotationsAdvanced from "highcharts/modules/annotations-advanced";
import priceIndicator from "highcharts/modules/price-indicator";
import fullScreen from "highcharts/modules/full-screen";
import stockTools from "highcharts/modules/stock-tools";
import axios from "axios";
import { PlotChart } from "./Utils";
import "./styles/TradeChart.css";
// @ts-expect-error TS(2732): Cannot find module '../../configs.json'. Consider ... Remove this comment to see the full error message
import { dataService, getStockData } from "../../configs.json";
import { useAppStore } from "../../stores/store";
import useLocalStorage, { BrokerDetails } from "../../hooks/useLocalStorage";
import {
  useExecuteStrategy,
  useGetStocksData,
} from "../../api/algotrading/requests";
import { useAnalysis } from "./hooks";

indicatorsAll(Highcharts);
annotationsAdvanced(Highcharts);
priceIndicator(Highcharts);
fullScreen(Highcharts);
stockTools(Highcharts);

// Apply the theme using setOptions()
// Highcharts.setOptions(Highcharts.theme.darkUnicaTheme);

function TradeChart(props: any) {
  const { isCandleStickChart } = props;

  const { storedValue: userName } = useLocalStorage<string | undefined>(
    "username"
  );
  const { storedValue: brokerDetails } = useLocalStorage<
    BrokerDetails | undefined
  >("brokerDetails");

  const { trades, strategyConfig } = useAnalysis();

  const getStockDataRequest = useMemo(
    () => ({
      ticker: strategyConfig.ticker,
      startDate: strategyConfig.startDate,
      endDate: strategyConfig.endDate,
      interval: strategyConfig.interval,
      username: userName,
      broker_name: brokerDetails?.name,
    }),
    [
      strategyConfig.ticker,
      strategyConfig.startDate,
      strategyConfig.endDate,
      strategyConfig.interval,
      userName,
      brokerDetails?.name,
    ]
  );

  const { data: stockData } = useGetStocksData(getStockDataRequest);

  const highchartOptions = useMemo(
    () =>
      PlotChart(
        stockData ?? [],
        strategyConfig.ticker,
        trades,
        isCandleStickChart
      ),
    [stockData, strategyConfig.ticker, trades, isCandleStickChart]
  );

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={highchartOptions}
      containerProps={{ style: { height: "100%", width: "100%" } }}
    />
  );
}

export default TradeChart;
