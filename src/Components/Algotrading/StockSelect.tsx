import Select from "react-select";
import { useState, useEffect } from "react";
import { dataService, stockSymbol } from "../../configs.json";
import {convertStocksMappingToArray} from "../Charts/utils";
import { Button, Paper, Switch, FormLabel, Typography } from "@material-ui/core";
import axios from "axios";

function StockSelect(setter,isMulti = false,stock_name = "stock_name") {
  const [options, setoptions] = useState("loading");

  useEffect(() => {
    axios.get(dataService + stockSymbol).then((response) => {
      setoptions(convertStocksMappingToArray(response.data.data));
      // console.log("options", options);
    });
  }, []);

  return (
    <div>
      <Select
      onChange={(e) => {
        console.log(e);
        if(isMulti){
          setter(stock_name,e);
        }else{
          setter(stock_name,e["value"]);
        }
        
      }}
      defaultValue={options[0]}
      options={options}
      placeholder="Select Data"
      isMulti = {isMulti}
    />

    </div>
    
  );
}

export default StockSelect;
