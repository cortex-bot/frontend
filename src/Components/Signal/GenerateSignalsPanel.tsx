import React from "react";
import { Button, Paper, Switch, FormLabel, Typography } from "@mui/material";
// @ts-expect-error TS(6142): Module '../Algotrading/StrategySelector' was resol... Remove this comment to see the full error message
import { StrategySelector } from "../Algotrading/StrategySelector";
import Select from "react-select";
import {
  host,
  getStrategyList,
  getStockBucketData,
  getBrokersList,
  saveStockBucketData,
  getIntervalList,
  getTradeTypeList,
  // @ts-expect-error TS(2732): Cannot find module '../../configs.json'. Consider ... Remove this comment to see the full error message
} from "../../configs.json";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  convertListToDropdown,
  convertDictListToDropdown,
} from "../Algotrading/Utils";
// @ts-expect-error TS(6142): Module '../Algotrading/StockSelect' was resolved t... Remove this comment to see the full error message
import StockSelect from "../Algotrading/StockSelect";
// @ts-expect-error TS(6142): Module '../Signal/StockBucketSelect' was resolved ... Remove this comment to see the full error message
import StockBucketSelect from "../Signal/StockBucketSelect";
import TextField from "@mui/material/TextField";

// @ts-expect-error TS(2732): Cannot find module '../../configs.json'. Consider ... Remove this comment to see the full error message
import { generateSignals } from "../../configs.json";

const defaultValues = {
  //     stock_list: ["INFY"],
  start_date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)
    .toISOString()
    .slice(0, 10),
  end_date: new Date().toISOString().slice(0, 10),
  //     // start_date: "2021-10-20",
  //     // end_date: "2021-11-20",
  //     strategy_name: "Random",
  // interval: "1d",
  username: localStorage.getItem("username"),
  //     broker_name: "PAPER_TRADING",
  //     stockBucketName: "test"
};

function GenerateSignalsPanel({
  updateStockList,
  updateStockBucketName,
  stockList,
}: any) {
  const [strategyList, setStrategyList] = useState([]);
  const [brokersList, setBrokersList] = useState([]);
  const [intervalList, setIntervalList] = useState([]);
  const [formValues, setFormValues] = useState(defaultValues);

  useEffect(() => {
    if ((formValues as any).stockBucketName == null) return;
    console.log(
      "Generating selected stocks",
      (formValues as any).stockBucketName
    );
    updateStockBucketName((formValues as any).stockBucketName);
    (formValues as any).updatedStockBucketName = (
      formValues as any
    ).stockBucketName;
    axios
      .get(host + getStockBucketData, {
        params: {
          request: (formValues as any).stockBucketName,
        },
      })
      .then((response) => {
        updateStockList(response.data.data.stock_symbols);
      });
  }, [(formValues as any).stockBucketName]);

  useEffect(() => {
    axios.get(host + getStrategyList).then((response) => {
      setStrategyList(convertListToDropdown(response.data.data));
    });

    axios.get(host + getBrokersList).then((response) => {
      setBrokersList(convertListToDropdown(response.data.data));
    });

    axios.get(host + getIntervalList).then((response) => {
      setIntervalList(convertListToDropdown(response.data.data));
    });
  }, []);

  const extractValuesFromMultiSelect = (name: any, value: any) => {
    var finalValue: any = [];

    value.forEach((value: any) => finalValue.push(value.value));

    setFormValues({
      ...formValues,
      [name]: finalValue,
    });
  };

  const handleChange = (e: any) => {
    // console.log("state = ", formValues,code);
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    // printing first then showing the value.
    // console.log(formValues);
  };

  const updateFormValue = (name: any, value: any) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });

    if (name == "stock_list") {
      updateStockList([...stockList, value]);
    }
  };

  const submitGenerateSignalRequest = () => {
    console.log("new executor request", formValues);

    const payload = {
      start_time: formValues.start_date,
      end_time: formValues.end_date,
      interval: (formValues as any).interval,
      stock_symbols: stockList,
      analysis_engine: "simple_engine",
      strategy_name: (formValues as any).strategy_name,
      username: localStorage.getItem("username"),
      broker_name: (formValues as any).broker_name,
      description: (formValues as any).remarks,
      bucket_name: (formValues as any).updatedStockBucketName
        ? (formValues as any).updatedStockBucketName
        : (formValues as any).stockBucketName,
    };

    axios
      .post(host + generateSignals, payload)
      .then((response) => {
        console.log("generate signal response", response.data);
        if (response.data.data.status == "SUCCESS") {
          alert("Signal generation started");
        } else {
          alert("Signal generation Failed, Please try again later !!!");
        }
      })
      .catch((error) => alert(error));
  };

  const submitSaveStockBucketRequest = () => {
    console.log("save stock bucket", formValues);

    const payload = {
      bucket_name: (formValues as any).updatedStockBucketName,
      stock_symbols: stockList,
      description: "Somthin i wanna write",
      username: localStorage.getItem("username"),
    };

    axios
      .post(host + saveStockBucketData, payload)
      .then((response) => {
        console.log("save data response ", response.data);
        alert(
          "Stock bucket saved " + (formValues as any).updatedStockBucketName
        );
      })
      .catch((error) => alert(error));
  };

  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return (
    <div>
      <div>
        <Paper className="bg-opacity-40 p-4 h-100">
          <h1 className="text-center font-bold text-lg">Generate Signals</h1>

          <Typography
            variant="h7"
            className="text-center text-gray-500 text-bold"
          >
            Select Stocks
          </Typography>
          {StockSelect(updateFormValue, false, "stock_list")}

          <Typography
            variant="h7"
            className="text-center text-gray-500 text-bold"
          >
            Select Strategy
          </Typography>

          <Select
            onChange={(e) => {
              // @ts-expect-error TS(2531): Object is possibly 'null'.
              updateFormValue("strategy_name", e.value);
              // setStrategyName(e["value"]);/
              // @ts-expect-error TS(2322): Type '{ onChange: (e: null) => void; placeholder: ... Remove this comment to see the full error message
            }}
            placeholder="Select Strategy"
            isRequired={true}
            defaultValue={strategyList[0]}
            options={strategyList}
          />

          <div className="grid md:grid-cols-2 gap-2 mt-3">
            <Select
              onChange={(e) => {
                // @ts-expect-error TS(2531): Object is possibly 'null'.
                updateFormValue("interval", e.value);
                // setStrategyName(e["value"]);/
                // @ts-expect-error TS(2322): Type '{ onChange: (e: null) => void; placeholder: ... Remove this comment to see the full error message
              }}
              placeholder="Select interval"
              isRequired={true}
              defaultValue={intervalList[0]}
              options={intervalList}
            />

            <Select
              onChange={(e) => {
                // @ts-expect-error TS(2531): Object is possibly 'null'.
                updateFormValue("broker_name", e.value);
                // @ts-expect-error TS(2322): Type '{ onChange: (e: null) => void; placeholder: ... Remove this comment to see the full error message
              }}
              placeholder="Select Broker"
              isRequired={true}
              defaultValue={brokersList[0]}
              options={brokersList}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-2 mt-3">
            <TextField
              variant="standard"
              onChange={handleChange}
              name="start_date"
              type="date"
              value={formValues.start_date}
              label={"Start Date"} />

            <TextField
              variant="standard"
              onChange={handleChange}
              name="end_date"
              type="date"
              value={formValues.end_date}
              label={"End Date"} />
          </div>

          <div className="grid md:grid-cols-2 gap-2 mt-3">
            <TextField
              variant="standard"
              onChange={handleChange}
              name="username"
              multiline="false"
              type="textarea"
              value={formValues.username}
              label={" username "} />

            <TextField
              variant="standard"
              onChange={handleChange}
              name="remarks"
              multiline="true"
              type="textarea"
              value={(formValues as any).remarks}
              label={" remarks "} />
          </div>
          <div className="grid grid-col-1 grid-flow-col m-3 align-bottom">
            <Button
              className=" bg-green-100"
              type="submit"
              onClick={submitGenerateSignalRequest}
            >
              Submit
            </Button>
          </div>
        </Paper>
      </div>

      <div className="mt-2">
        <Paper className="bg-opacity-40 p-4 h-100">
          <h1 className="text-center font-bold text-lg">Stock Bucket</h1>

          <Typography
            variant="h7"
            className="text-center text-gray-500 text-bold"
          >
            Select Stock Bucket
          </Typography>
          {StockBucketSelect(updateFormValue, false, "stockBucketName")}

          <TextField
            variant="standard"
            onChange={handleChange}
            name="updatedStockBucketName"
            multiline="false"
            type="textarea"
            value={(formValues as any).updatedStockBucketName}
            label={" stockBucketName "} />

          <Button
            className=" bg-green-100 btn btn-primary align-left"
            type="submit"
            onClick={submitSaveStockBucketRequest}
          >
            Save Bucket
          </Button>
        </Paper>
      </div>
    </div>
  );
}

export default GenerateSignalsPanel;
