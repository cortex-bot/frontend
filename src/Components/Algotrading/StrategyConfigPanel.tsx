import { Button, Paper, Switch, FormLabel, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
// @ts-expect-error TS(6142): Module './StockSelect' was resolved to 'D:/workspa... Remove this comment to see the full error message
import StockSelect from "./StockSelect";
import Select from "react-select";
import { convertListToDropdown, convertDictListToDropdown } from "./Utils";

// @ts-expect-error TS(6142): Module './SelectStockBasketType' was resolved to '... Remove this comment to see the full error message
import SelectStockBasektType from "./SelectStockBasketType";
// import { getTodaysDate, getExtraCharges } from "../utils";
// @ts-expect-error TS(2732): Cannot find module '../../configs.json'. Consider ... Remove this comment to see the full error message
import { host, saveStrategy, getIntervalList } from "../../configs.json";
import { convertFormValuesToPayload } from "./Utils";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useExecuteStrategy } from "../../api/algotrading/requests";
import useLocalStorage, { BrokerDetails } from "../../hooks/useLocalStorage";
import { useStore } from "zustand";
import { StrategyConfig } from "../../api/algotrading/types";
import { useAppStore } from "../../stores/store";
import { useAnalysis } from "./hooks";

export default function StrategyConfigPanel() {
  //   const handleReset = () => setFormValues(defaultValues);

  const [intervalList, setIntervalList] = useState([]);

  const code = useAppStore((state) => state.code);

  const { strategyConfig, setStrategyConfig, executeActiveStrategy } =
    useAnalysis();

  useEffect(() => {
    axios.get(host + getIntervalList).then((response) => {
      console.log("response for interval list: " + response);
      setIntervalList(convertListToDropdown(response.data.data));
    });
  }, []);

  const { storedValue: userName } = useLocalStorage<string | undefined>(
    "username"
  );

  const updateConfigProperty = useCallback(
    <K extends keyof StrategyConfig>(name: K, value: StrategyConfig[K]) => {
      setStrategyConfig({
        ...strategyConfig,
        [name]: value,
      });
    },
    [strategyConfig]
  );

  // const strategyConfig = useMemo(
  //   () => ({
  //     startDate: formValues.start_date,
  //     endDate: formValues.end_date,
  //     strategyName: formValues.strategy_name,
  //     ticker: formValues.stock_name,
  //     enableRanking: formValues.ranking,
  //     stockBasket: formValues.stock_basket,
  //     description: formValues.description,
  //     interval: formValues.interval,
  //     strategy_code: code,
  //     backtestEngine: "simple_engine",
  //     username: userName,
  //     broker_name: brokerDetails?.name,
  //   }),
  //   [formValues, code, userName, brokerDetails]
  // );

  const handleSubmit = () => {
    // TODO: Calidate empty fields
    // console.log("Code Pushed");
    // if (formValues.strategy_name === "") alert("Please enter Strategy name");
    // if (formValues.start_date === "") alert("Please enter start_date ");
    // if (formValues.end_date === "") alert("Please enter end_date");
    // if (formValues.interval === "") alert("Please select Interval");

    // TODO: handle failures
    executeActiveStrategy();

    // axios
    //   .post(host + executeStrategy, payload)
    //   .then((response) => {
    //     console.log("trade data", response.data);

    //     if (response.data.status == "SUCCESS") {
    //       if (response.data.data == "RANKING") {
    //         // console.log("trades received from server",response.data.trades)
    //         // alert("Strategy Sent To Queue..");
    //         alert("Strategy Executed and Updated in Ranking");
    //       } else {
    //         // console.log("trades received from server",response.data.trades)

    //         // console.log("backtest received from server",response.data.backtestResult)
    //         settrades(response.data.data.trades);
    //         delete response.data.data.trades;
    //         setAnalysis(response.data.data);
    //       }
    //     } else {
    //       alert("Error: " + response.data.error_description);
    //     }
    //   })
    //   .catch((error) => alert("Algo trade data " + error));
  };

  // save the code using the api providede by analysis service.
  const saveCode = () => {
    // create payload.
    var payload = {
      code: code,
      strategy_name: strategyConfig.strategyName,
      username: userName ?? "Anonymous",
      description: strategyConfig.description,
    };

    axios
      .post(host + saveStrategy, payload)
      .then((response) => {
        console.log("strategy save response", response);
        if (response.data.status == "success".toUpperCase())
          alert("Strategy Saved, id = " + response.data.data.strategy_id);
        else alert("failed to save the strategy");
      })

      .catch((error) => alert(error));
  };

  // common functino to handle the change in the formValues.

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateConfigProperty(name as keyof StrategyConfig, value);
  };

  const handleChangeSwitch = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateConfigProperty(name as keyof StrategyConfig, checked);
  };

  const selectDropdown = (name: string, value: any) => {
    // TODO: This seems wrong. StockSelect's stockName prop is weird
    updateConfigProperty("ticker", value);
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Paper className="bg-opacity-40 p-4 h-100">
      {/* style="height:100%; width:100%;"> */}
      <Typography variant="h7" className="text-center text-gray-500 text-bold">
        Select Data
      </Typography>
      <StockSelect setter={selectDropdown} />

      <div className="grid md:grid-cols-2 md:grid-rows-2 gap-2 mt-3">
        <div>
          <FormLabel children={"Ranking"} />
          <Switch
            color="secondary"
            // checked={formValues.ranking}
            name="enableRanking"
            onChange={handleChangeSwitch}
            // value={formValues.ranking}
            // @ts-expect-error TS(2322): Type '{ color: "secondary"; name: string; onChange... Remove this comment to see the full error message
            label={"Use code for Ranking Service"}
          />
        </div>
        <div>
          <Select
            // @ts-expect-error TS(2531): Object is possibly 'null'.
            onChange={(e) => updateConfigProperty("interval", e.value)}
            placeholder="Interval"
            name="interval"
            // @ts-expect-error TS(2322): Type '{ onChange: (e: null) => void; placeholder: ... Remove this comment to see the full error message
            isRequired={true}
            defaultValue={intervalList[0]}
            options={intervalList}
          />
        </div>

        {SelectStockBasektType(selectDropdown)}
      </div>

      <div
        className="grid md:grid-rows-2 gap-3 mt-3"
        style={{ backgroundColor: "rgba(144, 238, 144, 0.5)" }}
      >
        <TextField
          variant="standard"
          onChange={handleChange}
          name="startDate"
          type="datetime-local"
          value={strategyConfig.startDate}
          label={"Start Date"}
        />

        <TextField
          variant="standard"
          onChange={handleChange}
          name="endDate"
          type="datetime-local"
          value={strategyConfig.endDate}
          label={"End Date"}
        />
      </div>

      <div className="grid">
        <TextField
          variant="standard"
          onChange={handleChange}
          name="strategyName"
          type="input"
          value={strategyConfig.strategyName}
          label={"Strategy name"}
          required
        />

        {/*  not saved right now */}
        <TextField
          variant="standard"
          onChange={handleChange}
          name="description"
          // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'boolean |... Remove this comment to see the full error message
          multiline="true"
          type="textarea"
          value={strategyConfig.description}
          label={" description "}
        />
      </div>
      <div className="grid grid-col-2 grid-flow-col m-3 align-bottom">
        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={saveCode}>Save</Button>
      </div>
    </Paper>
  );
}
