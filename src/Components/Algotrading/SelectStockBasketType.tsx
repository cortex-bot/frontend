import Select from "react-select";
import { useState, useEffect } from "react";
// @ts-expect-error TS(2732): Cannot find module '../../configs.json'. Consider ... Remove this comment to see the full error message
import { dataService, getStockBasketList } from "../../configs.json";
import {convertListToDropdown} from "./Utils";

import { Button, Paper, Switch, FormLabel, Typography } from "@material-ui/core";
import axios from "axios";

function SelectStockBasektType(setter: any) {
  const [options, setoptions] = useState("loading");

  useEffect(() => {
    axios.get(dataService + getStockBasketList).then((response) => {
      setoptions(convertListToDropdown(response.data.data));
    });
  }, []);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div>


      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Select
      onChange={(e) => {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        setter("stock_basket",e["value"]);
      }}
      defaultValue={options[0]}
      // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'readonly ... Remove this comment to see the full error message
      options={options}
      placeholder = "Select Stock Basket"

    />
    </div>
    
  );
}

export default SelectStockBasektType;
