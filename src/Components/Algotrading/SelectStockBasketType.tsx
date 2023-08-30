import Select from "react-select";
import { useState, useEffect } from "react";
import { dataService, getStockBasketList } from "../../configs.json";
import {convertListToDropdown} from "./Utils";

import { Button, Paper, Switch, FormLabel, Typography } from "@material-ui/core";
import axios from "axios";

function SelectStockBasektType(setter) {
  const [options, setoptions] = useState("loading");

  useEffect(() => {
    axios.get(dataService + getStockBasketList).then((response) => {
      setoptions(convertListToDropdown(response.data.data));
    });
  }, []);

  return (
    <div>


      <Select
      onChange={(e) => {
        setter("stock_basket",e["value"]);
      }}
      defaultValue={options[0]}
      options={options}
      placeholder = "Select Stock Basket"

    />
    </div>
    
  );
}

export default SelectStockBasektType;
