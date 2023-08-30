import React from "react";

const HighchartsDependencies = () => {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      {/* Stylesheets */}
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <link
        rel="stylesheet"
        type="text/css"
        href="https://code.highcharts.com/css/stocktools/gui.css"
      />
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <link
        rel="stylesheet"
        type="text/css"
        href="https://code.highcharts.com/css/annotations/popup.css"
      />

      {/* Scripts */}
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <script src="https://code.highcharts.com/stock/highstock.js"></script>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <script src="https://code.highcharts.com/stock/modules/data.js"></script>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <script src="https://code.highcharts.com/stock/indicators/indicators-all.js"></script>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <script src="https://code.highcharts.com/stock/modules/drag-panes.js"></script>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <script src="https://code.highcharts.com/modules/annotations-advanced.js"></script>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <script src="https://code.highcharts.com/modules/price-indicator.js"></script>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <script src="https://code.highcharts.com/modules/full-screen.js"></script>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <script src="https://code.highcharts.com/modules/stock-tools.js"></script>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <script src="https://code.highcharts.com/stock/modules/heikinashi.js"></script>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <script src="https://code.highcharts.com/stock/modules/hollowcandlestick.js"></script>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    </>
  );
};

export default HighchartsDependencies;
