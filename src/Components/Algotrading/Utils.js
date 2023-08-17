

// import Highcharts from 'highcharts';
// import darkUnicaTheme from 'highcharts/themes/dark-unica';

// Apply the theme using setOptions()
// Highcharts.setOptions(darkUnicaTheme);


export const addZeroAtstart = (x) => {
    if (x < 10) return "0" + x;
    return x;
};


export const convertDictListToDropdown = (data) => {
    let options = Object.keys(data).map((key) => ({
        label: data[key],
        value: key
    }));
}

export const convertListToDropdown = (data) => {
    let options = [];
    data.forEach((item) => {
        options.push({
            label: item,
            value: item
        });
    }
    );
    // console.log("options", options);
    return options;
}


export const convertStockDataToOhlc = (stockData, name) => {
    let ohlc = [];
    console.log("stockData: ", stockData.length);
    for (let i = 0; i < stockData.length; i++) {
        ohlc.push(
            [
                convertDateToIST(new Date(stockData[i].Date)),
                stockData[i].Open,
                stockData[i].High,
                stockData[i].Low,
                stockData[i].Close]
        );
    }

    // console.log("returning ohlc: ", ohlc);

    return {
        navigation: {
            bindingsClassName: 'tools-container' // informs Stock Tools where to look for HTML elements for adding technical indicators, annotations etc.
        },
        stockTools: {
            gui: {
                enabled: true // disable the built-in toolbar
            }
        },
        xAxis: [{
            type: 'datetime',
            dateTimeLabelFormats: {
                month: '%e. %b',
                year: '%b'
            },
            title: { text: "Dates" }
        }],
        yAxis: [{
            labels: {
                align: 'left'
            },
            height: '100%',
            resize: {
                enabled: true
            }
        }, {
            labels: {
                align: 'left'
            },
            top: '80%',
            height: '80%',
            offset: 0
        }],
        tooltip: {
            shape: 'square',
            headerShape: 'callout',
            borderWidth: 0,
            shadow: false,

        },
        series: [
            {
                type: 'candlestick',
                id: name + '-ohlc',
                name: name + ' Stock Price',
                data: ohlc
            },
            // {
            //     type: 'scatter',
            //     id: '_buySell',
            //     name: '_buySell',
            //     data: buySellData,
            //     // xAxis: 1
            // }
        ],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 1800
                },
                chartOptions: {
                    rangeSelector: {
                        inputEnabled: false
                    }
                }
            }]
        }
    }


}


export const getTodaysDate = () => {
    let today = new Date();
    return (
        today.getFullYear() +
        "-" +
        addZeroAtstart(today.getMonth()) +
        "-" +
        addZeroAtstart(today.getDate())
    );
};


const convertDateToIST = (timestamp) => {
    const date = new Date(timestamp);
    const istOffset = 5*60+30;
    const istTimestamp = date.getTime() + (istOffset) * 60 * 1000;
  
    return istTimestamp;
  };




  export function formatDatetime(timestamp) {
    const date = new Date(timestamp);
  
    // Convert to IST
    const hoursIST = date.getUTCHours(); // Add 5 hours for IST
    const minutesIST = date.getUTCMinutes(); // Add 30 minutes for IST
  
    // Handle cases where hours and/or minutes exceed 24 and 60, respectively
    const formattedHours = (hoursIST % 24).toString().padStart(2, '0');
    const formattedMinutes = (minutesIST % 60).toString().padStart(2, '0');
  
    // Format the date and time string
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${formattedHours}:${formattedMinutes}:${date.getSeconds().toString().padStart(2, '0')}`;
    
    return `${formattedDate} ${formattedTime}`;
  }
  

  export const PlotChart = (data, name, trades, isCandleStickChart) => {
    const buySellData = trades
      ? trades
      .map((trade) => ({
          x: convertDateToIST(trade.timestamp),
          y: trade.amount*1.002,
          // color: trade.action === 'BUY' ? 'green' : 'red',
          quantity: String(trade.quantity),
          marker:
          trade.action === 'BUY' ? {
            symbol: "triangle",
            fillColor: "#83ff74",
            lineColor: "black",
            lineWidth: 1,
          } : {
            symbol: "triangle-down",
            fillColor: "#ff0000",
            lineColor: "black",
            lineWidth: 1,
          }
          
        }))
      : [];

    return {
        // themes: darkUnicaTheme,
      navigation: {
        bindingsClassName: 'tools-container',
      },
      stockTools: {
        gui: {
          enabled: true,
        },
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          millisecond: '%H:%M:%S.%L',
          second: '%H:%M:%S',
          minute: '%H:%M',
          hour: '%H:%M',
          day: '%e %b',
          month: '%e. %b',
          year: '%b',
        },
        title: {
          text: 'Timestamp',
        },
      },
      yAxis: [
        {
          labels: {
            align: 'left',
          },
          height: '80%',
          resize: {
            enabled: true,
          },
        },
        {
          labels: {
            align: 'left',
          },
          top: '80%',
          height: '20%',
          offset: 0,
        },
      ],
      tooltip: {
        shape: 'square',
        headerShape: 'callout',
        pointFormatter: function () {
          return `<b>Value: ${parseFloat(this.y).toFixed(2)}</b><br/>Time: ${formatDatetime(this.x)}`;
        },
        borderWidth: 0,
        shadow: true,
      },
      series: generateSeriesForGraph(data, buySellData, isCandleStickChart),
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 2000,
            },
            chartOptions: {
              rangeSelector: {
                inputEnabled: true,
              },
            },
          },
        ],
      },
    };
  };
  
  const generateSeriesForGraph = (data, buySellData, isCandleStickChart) => {
    console.log("stock data: ", data);
  
    if (data == null)
      return {
        type: "candlestick",
        id: "candlestick",
        name: "Stock Price",
        data: null,
      };
  
    let plotData = [];

  
    if (!isCandleStickChart) {
      // Line chart
      for (let i = 0; i < data.length; i += 1) {
        plotData.push({
          x: convertDateToIST(new Date(data[i].Date)),
          y: data[i].Close,
        });
      }
  
      return [
        
        {
          type: "spline",
          id: "line chart",
          name: "Stock Price",
          data: plotData,
        },
        {
          type: "scatter",
          id: "buySignal",
          name: "Buy sell Signal",
          data: buySellData
        },
      ];
    } else {
      // Candlestick chart
      for (let i = 0; i < data.length; i += 1) {
        plotData.push([
          convertDateToIST(new Date(data[i].Date)),
          data[i].Open,
          data[i].High,
          data[i].Low,
          data[i].Close,
        ]);
      }
  
      return [
        {
          type: "candlestick",
          id: "candlestick",
          name: "Stock Price",
          data: plotData,
        },
        {
          type: "scatter",
          id: "buySignal",
          name: "Buy sell Signal",
          data: buySellData
        },
      ];
    }
  };
  



export const convertFormValuesToPayload = (formValues) => {
    // console.log("formValues: ", formValues);
    // let array = [];
    let payload = {};
    payload.ticker = Array.of(formValues.stock_symbol);
    payload.startDate = formValues.start_date;
    payload.endDate = formValues.end_date;
    payload.strategyName = formValues.strategy_name;
    payload.ticker = formValues.stock_name
    payload.enableRanking = formValues.ranking
    payload.stockBasket = formValues.stock_basket
    payload.username = formValues.username // doubtful
    payload.description = formValues.description // doubtful
    payload.interval = formValues.interval // doubtful
    return payload;
}
// export default PlotChart;