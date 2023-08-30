import { useState, useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import Indicators from "highcharts/indicators/indicators-all.js";
import DragPanes from "highcharts/modules/drag-panes.js";
import AnnotationsAdvanced from "highcharts/modules/annotations-advanced.js";
import PriceIndicator from "highcharts/modules/price-indicator.js";
import FullScreen from "highcharts/modules/full-screen.js";
import StockTools from "highcharts/modules/stock-tools.js";

import "./Charts.css";
import { host, getStockData, stockDataUpdate } from "../../configs.json";
import StockSelect from "./StockSelect";

import PlotChart from "./utils";

Indicators(Highcharts);
DragPanes(Highcharts);
AnnotationsAdvanced(Highcharts);
PriceIndicator(Highcharts);
FullScreen(Highcharts);
StockTools(Highcharts);

function Charts() {
  const [stock_name, setstock_name] = useState("BANK_NIFTY");
  const [options, setoptions] = useState(null);

  useEffect(() => {
    let payload = {
      stock_name: stock_name,
      start: new Date(Date.now() - (1000 * 60 * 60 * 24 * 30)).toISOString().slice(0, 10),
      end: new Date().toISOString().slice(0, 10),
      interval: "daily",
    };
    
    const api_url = host + getStockData;
    // headers["Access-Control-Allow-Origin"] = host;

    // const api_url = "https://demo-live-data.highcharts.com/aapl-ohlc.json";
    axios
      .post(api_url, payload)
      .then((data) => {
        setoptions(PlotChart(data.data.data, stock_name));
      }, [])

      .catch((error) => alert(error));
  }, [stock_name]);

  function updateData(e) {
    const payload_update_data = { update: true };
    const api_url = host + stockDataUpdate;
    axios.post(api_url, payload_update_data).then((data) => {
      alert(data.data.data);
    }, []);
  }

  return (
    <div className="">
      {StockSelect(setstock_name)}
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
      {/* Alerts use this button carefully */}
      {/* <button
        onClick={updateData}
        className="bg-pink-200 hover:bg-pink-500 hover:text-white text-pink-500 text-center py-2 px-4 rounded"
      >
        Update Data{" "}
      </button> */}
    </div>
  );
}
export default Charts;
