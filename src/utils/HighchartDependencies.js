import React from "react";

const HighchartsDependencies = () => {
  return (
    <>
      {/* Stylesheets */}
      <link
        rel="stylesheet"
        type="text/css"
        href="https://code.highcharts.com/css/stocktools/gui.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://code.highcharts.com/css/annotations/popup.css"
      />

      {/* Scripts */}
      <script src="https://code.highcharts.com/stock/highstock.js"></script>
      <script src="https://code.highcharts.com/stock/modules/data.js"></script>
      <script src="https://code.highcharts.com/stock/indicators/indicators-all.js"></script>
      <script src="https://code.highcharts.com/stock/modules/drag-panes.js"></script>
      <script src="https://code.highcharts.com/modules/annotations-advanced.js"></script>
      <script src="https://code.highcharts.com/modules/price-indicator.js"></script>
      <script src="https://code.highcharts.com/modules/full-screen.js"></script>
      <script src="https://code.highcharts.com/modules/stock-tools.js"></script>
      <script src="https://code.highcharts.com/stock/modules/heikinashi.js"></script>
      <script src="https://code.highcharts.com/stock/modules/hollowcandlestick.js"></script>
      <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    </>
  );
};

export default HighchartsDependencies;
