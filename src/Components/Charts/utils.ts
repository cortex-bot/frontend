
const convertDateToUTC = (date: any) => {
    // console.log(date);
    return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

export const convertStocksMappingToArray = (stocksMapping: any) => {
    let stocks = [];
    // console.log("stocksMapping length", stocksMapping);

    for(var prop in stocksMapping) {
        stocks.push({
            label: prop,
            value: stocksMapping[prop]});
    }
    return stocks;
}


export const convertListToDropDown = (data: any) => {
    let stocks = [];

    for(var i=0 ; i<data.length; i++) { 
        stocks.push({
            label: data[i],
            value: data[i]});
    }
    return stocks;
}
const PlotChart = (data: any, name: any) => {
    // split the data set into ohlc and volume
    const ohlc = data.map((item: any) => [
      convertDateToUTC(new Date(item[0])),
      item[1], // open
      item[2], // high
      item[3], // low
      item[4] // close
    ]);
  
    const volume = data.map((item: any) => [convertDateToUTC(new Date(item[0])), item[5]]);
  
    return {
      chart: {
        type: 'line',
        events: {
          load: function () {
            const yAxis = (this as any).yAxis[0];
  
            // Attach event listeners to the yAxis group for drag events
yAxis.group.on('mousedown', (e: any) => {
    const plotTop = (this as any).plotTop;
    const plotHeight = (this as any).plotHeight;
    const axisMin = yAxis.min;
    const axisMax = yAxis.max;
    const yAxisClickPosition = e.chartY - plotTop;
    const yAxisPositionRatio = yAxisClickPosition / plotHeight;
    const yAxisValueAtClick = axisMax - (axisMax - axisMin) * yAxisPositionRatio;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    function onMouseMove(e: any) {
        const newAxisValue = yAxisValueAtClick - ((e.chartY - plotTop) / plotHeight) * (axisMax - axisMin);
        yAxis.setExtremes(Math.min(axisMax, newAxisValue), axisMax, false);
    }
    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
});
          }
        }
      },
      navigator: {
        enabled: true
      },
      // Enable the range selector for selecting the Y-axis range
      rangeSelector: {
        enabled: true
      },
      yAxis: [
        {
          labels: {
            align: 'left'
          },
          height: '80%',
          resize: {
            enabled: true
          }
        },
        {
          labels: {
            align: 'left'
          },
          top: '80%',
          height: '20%',
          offset: 0
        }
      ],
      tooltip: {
        shape: 'square',
        headerShape: 'callout',
        borderWidth: 0,
        shadow: true,
        positioner: function (width: any, height: any, point: any) {
          const chart = (this as any).chart;
          let position;
  
          if (point.isHeader) {
            position = {
              x: Math.max(
                // Left side limit
                chart.plotLeft,
                Math.min(
                  point.plotX + chart.plotLeft - width / 2,
                  // Right side limit
                  chart.chartWidth - width - chart.marginRight
                )
              ),
              y: point.plotY
            };
          } else {
            position = {
              x: point.series.chart.plotLeft,
              y: point.series.yAxis.top - chart.plotTop
            };
          }
  
          return position;
        }
      },
      series: [
        {
          type: 'ohlc',
          id: name + '-ohlc',
          name: name + ' Stock Price',
          data: ohlc
        },
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 2100
            },
            chartOptions: {
              rangeSelector: {
                inputEnabled: false
              }
            }
          }
        ]
      }
    };
  };
  

export default PlotChart;