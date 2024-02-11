import React, { useState, useEffect } from "react";
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

indicatorsAll(Highcharts);
annotationsAdvanced(Highcharts);
priceIndicator(Highcharts);
fullScreen(Highcharts);
stockTools(Highcharts);

// Apply the theme using setOptions()
// Highcharts.setOptions(Highcharts.theme.darkUnicaTheme);

function TradeChart(props: any) {
  const { formValues, trades, className, isCandleStickChart } = props;
  const [options, setOptions] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [stockName, setStockName] = useState(null);

  const api_url = dataService + getStockData;
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const payload = {
      ticker: formValues.stock_name || "TATAMOTORS.NS",
      startDate: formValues.start_date,
      endDate: formValues.end_date,
      interval: formValues.interval || "1d",
    };

    if (localStorage.getItem("username") != null) {
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      payload["username"] = localStorage.getItem("username");
      if (localStorage.getItem("brokerDetails") != null)
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        payload["broker_name"] = JSON.parse(
          // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
          localStorage.getItem("brokerDetails")
        )["name"];
      // payload["interval"] = "1d";
      console.log("post request upd", payload);
    }

    axios
      .post(api_url, payload, config)
      .then((data) => {
        // @ts-expect-error TS(2345): Argument of type '{ navigation: { bindingsClassNam... Remove this comment to see the full error message
        setOptions(
          PlotChart(data.data.data, payload.ticker, trades, isCandleStickChart)
        );
        setStockData(data.data.data);
        setStockName(payload.ticker);
        console.log("options set : ", options);
      })
      .catch((error) => alert("Getting Stock Data " + error));
  }, [
    formValues.stock_name,
    formValues.start_date,
    formValues.end_date,
    formValues.interval,
    trades,
    isCandleStickChart,
  ]);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div
      className={className}
      style={{
        minHeight: "40vh",
        width: "100%",
        position: "relative",
        height: "100%",
      }}
    >
      {options && (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={options}
          containerProps={{ style: { height: "100%", width: "100%" } }}
        />
      )}
    </div>
  );
}

export default TradeChart;
