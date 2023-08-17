import React from 'react'
import { Button, Paper, Switch, FormLabel, Typography } from "@material-ui/core";
import { StrategySelector } from '../Algotrading/StrategySelector';
import Select from "react-select";
import { host, getStrategyList, getStrategyCode, getBrokersList, getTradeTypeList } from "../../configs.json";
import { useState, useEffect } from "react";
import axios from "axios";
import { convertListToDropdown,convertDictListToDropdown } from '../Algotrading/Utils';
import StockSelect from "../Algotrading/StockSelect";
import TextField from "@material-ui/core/TextField";
import { spawnNewExecutor } from "../../configs.json";


const defaultValues = {
  stock_list: ["INFY"],
  start_date: new Date(Date.now() - (1000 * 60 * 60 * 24 * 30)).toISOString().slice(0, 10),
  end_date: new Date().toISOString().slice(0, 10),
  // start_date: "2021-10-20",
  // end_date: "2021-11-20",
  strategy_name: "Random",
  remarks: "",
  username: "pankaj369",
  trade_type: "HISTORICAL_TRADING",
  broker_name: "PAPER_TRADING"
};


const createExecutorRequest = (request) => {
  console.log("new executor request", request)

  let executorRequest = {}
  executorRequest.broker_name = request.broker_name; // ANGER_ONE, PAPER_TRADING
  executorRequest.executor_type = "ALGORITHM"; // need dropdown at  ui later.
  executorRequest.trade_type = request.trade_type;
  executorRequest.username = request.username;
  executorRequest.remarks = request.remarks;

  executorRequest.strategy_params = {
    stock_list:request.stock_list,
    strategy_name: request.strategy_name,
    start_date: request.start_date,
    end_date: request.end_date
  }

  return executorRequest;
}


export default function SpawnExecutors() {

  // drop down selections
  const [strategyList, setStrategyList] = useState([]);
  const [brokersList, setBrokersList] = useState([]);
  const [tradeTypeList, setTradeTypeList] = useState([]);


  const [strategyName, setStrategyName] = useState(null);
  const [formValues, setFormValues] = useState(defaultValues);

  useEffect(() => {
    axios
      .get(host + getStrategyList)
      .then((response) => {
        setStrategyList(convertListToDropdown(response.data.data));
      }
      );


    axios
      .get(host + getBrokersList)
      .then((response) => {
        setBrokersList(convertListToDropdown(response.data.data));
      }
      );


    axios
      .get(host + getTradeTypeList)
      .then((response) => {
        setTradeTypeList(convertListToDropdown(response.data.data));
      }
      );

  }, []);

  const submitNewExecutorRequest = () => {
    console.log("new executor request", formValues)

    axios
      .post(host + spawnNewExecutor, createExecutorRequest(formValues))
      .then((response) => {
        console.log("trade data", response.data);
        alert("Executor Id " + response.data.executor_id)
      }).catch((error) => alert(error));

  }

  // {stock_list: Array(1), start_date: '2023-05-18', end_date: '2023-06-17', strategy_name: 'Random', remarks: '', …}

  const handleChange = (e) => {
    // console.log("state = ", formValues,code);
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    // printing first then showing the value.
    // console.log(formValues);
  };

  const extractValuesFromMultiSelect = (name, value) => {
    var finalValue = [];

    value.forEach((value) => finalValue.push(value.value));

    setFormValues({
      ...formValues,
      [name]: finalValue,
    });
  };

  const updateFormValue = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <div>
<form onSubmit={submitNewExecutorRequest}>
      <Paper className="bg-opacity-40 p-4 h-100" >
        <h1 className="text-center font-bold text-lg">Create Executor</h1>
        {/* style="height:100%; width:100%;"> */}
        <Typography variant="h7" className="text-center text-gray-500 text-bold">
          Select Strategy
        </Typography>

        <Select
          onChange={(e) => {
            updateFormValue("strategy_name", e.value)
            // setStrategyName(e["value"]);/
          }}
          placeholder = "Select Strategy"
          isRequired = {true}
          defaultValue={strategyList[0]}
          options={strategyList}
        />

        <Typography variant="h7" className="text-center text-gray-500 text-bold">
          Select Stocks
        </Typography>
        {StockSelect(extractValuesFromMultiSelect, true, "stock_list")}

        <div className="grid md:grid-cols-2 gap-2 mt-3">

          <Select
            onChange={(e) => {
              updateFormValue("trade_type", e.value)
              // setStrategyName(e["value"]);/
            }}
            placeholder = "Select trade Type"
          isRequired = {true}
            defaultValue={tradeTypeList[0]}
            options={tradeTypeList}
          />

<Select
  onChange={(e) => {
    updateFormValue("broker_name", e.value);
  }}
  placeholder="Select Broker"
  isRequired={true}
  defaultValue={brokersList[0]}
  options={brokersList}
/>



        </div>


        <div className="grid md:grid-cols-2 gap-2 mt-3">
          <TextField
            onChange={handleChange}
            name="start_date"
            type="date"
            value={formValues.start_date}
            label={"Start Date"}
          />

          <TextField
            onChange={handleChange}
            name="end_date"
            type="date"
            value={formValues.end_date}
            label={"End Date"}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-2 mt-3">
          <TextField
            onChange={handleChange}
            name="remarks"
            multiline="true"
            type="textarea"
            value={formValues.remarks}
            label={" remarks "}
          />

          <TextField
            onChange={handleChange}
            name="username"
            multiline="false"
            type="textarea"
            value={formValues.username}
            label={" username "}
          />

        </div>
        <div className="grid grid-col-1 grid-flow-col m-3 align-bottom">
          <Button className=' bg-green-100'
            type = "submit" > Submit </Button>
        </div>

      </Paper>
      </form>
    </div>
  )
}

// {
//   "stock_list" : ["REL"],


//     "strategy_name" : "Random",
//       "broker_name" : "PAPER_TRADING",
//         "trade_type" : "HISTORICAL_TRADING",
//           "start_date" : "2022-01-01",
//             "end_date" : "2022-06-01",
//               "username": "pankaj369",
//                 "remarks": "testing strategy"
// }