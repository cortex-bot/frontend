import Select from "react-select";
import { useState, useEffect } from "react";
// @ts-expect-error TS(2732): Cannot find module '../../configs.json'. Consider ... Remove this comment to see the full error message
import { dataService, stockSymbol } from "../../configs.json";
import { convertStocksMappingToArray } from "../Charts/utils";
import { Button, Paper, Switch, FormLabel, Typography } from "@mui/material";
import axios from "axios";

type StockSelectProps = {
  setter: (name: string, value: any) => void;
  isMulti?: boolean;
  stockName?: string;
};

function StockSelect(props: StockSelectProps) {
  const { setter, isMulti = false, stockName = "stock_name" } = props;
  const [options, setoptions] = useState("loading");

  useEffect(() => {
    axios.get(dataService + stockSymbol).then((response) => {
      // @ts-expect-error TS(2345): Argument of type '{ label: string; value: any; }[]... Remove this comment to see the full error message
      setoptions(convertStocksMappingToArray(response.data.data));
      // console.log("options", options);
    });
  }, []);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div>
      <Select
        onChange={(e) => {
          console.log(e);
          if (isMulti) {
            setter(stockName, e);
          } else {
            // @ts-expect-error TS(2531): Object is possibly 'null'.
            setter(stockName, e["value"]);
          }
        }}
        defaultValue={options[0]}
        // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'readonly ... Remove this comment to see the full error message
        options={options}
        placeholder="Select Data"
        isMulti={isMulti}
      />
    </div>
  );
}

export default StockSelect;
