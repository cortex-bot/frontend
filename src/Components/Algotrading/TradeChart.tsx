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
import { Trade } from "../../api/algotrading/types";
import { useAnalysis } from "./hooks";

indicatorsAll(Highcharts);
annotationsAdvanced(Highcharts);
priceIndicator(Highcharts);
fullScreen(Highcharts);
stockTools(Highcharts);

// Apply the theme using setOptions()
// Highcharts.setOptions(Highcharts.theme.darkUnicaTheme);

const EMPTY_TRADES_ARRAY: Trade[] = [];

function TradeChart(props: any) {
  const { className, isCandleStickChart } = props;
  // const [options, setOptions] = useState(null);

  const { storedValue: userName } = useLocalStorage<string | undefined>(
    "username"
  );
  const { storedValue: brokerDetails } = useLocalStorage<
    BrokerDetails | undefined
  >("brokerDetails");

  const { trades, strategyConfig } = useAnalysis();

  const getStockDataRequest = useMemo(
    () => ({
      ticker: strategyConfig.ticker ?? "TATAMOTORS.NS",
      startDate: strategyConfig.startDate,
      endDate: strategyConfig.endDate,
      interval: strategyConfig.interval ?? "1d",
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

  const api_url = dataService + getStockData;
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };

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

  // useEffect(() => {
  //   const payload = {
  //     ticker: strategyConfig.ticker ?? "TATAMOTORS.NS",
  //     startDate: strategyConfig.startDate,
  //     endDate: strategyConfig.endDate,
  //     interval: strategyConfig.interval ?? "1d",
  //     username: userName,
  //     broker_name: brokerDetails?.name,
  //   };

  //   axios
  //     .post(api_url, payload, config)
  //     .then((data) => {
  //       // @ts-expect-error TS(2345): Argument of type '{ navigation: { bindingsClassNam... Remove this comment to see the full error message
  //       setOptions(
  //         PlotChart(data.data.data, payload.ticker, trades, isCandleStickChart)
  //       );
  //       console.log("options set : ", options);
  //     })
  //     .catch((error) => alert("Getting Stock Data " + error));
  // }, [
  //   strategyConfig.ticker,
  //   strategyConfig.startDate,
  //   strategyConfig.endDate,
  //   strategyConfig.interval,
  //   brokerDetails?.name,
  //   trades,
  //   userName,
  //   isCandleStickChart,
  // ]);

  return (
    <div
      className={className}
      style={{
        minHeight: "40vh",
        width: "100%",
        position: "relative",
        height: "100%",
      }}
    >
      {highchartOptions && (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={highchartOptions}
          containerProps={{ style: { height: "100%", width: "100%" } }}
        />
      )}
    </div>
  );
}

export default TradeChart;
