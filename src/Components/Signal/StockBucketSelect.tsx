import Select from "react-select";
import { useState, useEffect } from "react";
import { host, getStockBucketList } from "../../configs.json";
import {convertListToDropDown} from "../Charts/utils";
import { Button, Paper, Switch, FormLabel, Typography } from "@material-ui/core";
import axios from "axios";

function StockBucketSelect(setter,isMulti = false,bucket_name = "stockBucketName") {
  const [options, setoptions] = useState("loading");

  useEffect(() => {
    axios.get(host + getStockBucketList).then((response) => {
      setoptions(convertListToDropDown(response.data.data));
      console.log("options stockbucketlist", convertListToDropDown(response.data.data));
    });
  }, []);

  return (
    <div>
      <Select
      onChange={(e) => {
        console.log("dropdown updated of stock bucket",e);
        if(isMulti){
          setter(bucket_name,e["value"]);
        }else{
          setter(bucket_name,e["value"]);
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

export default StockBucketSelect;
