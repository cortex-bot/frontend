import Select from "react-select";
import { useState, useEffect } from "react";
// @ts-expect-error TS(2732): Cannot find module '../../configs.json'. Consider ... Remove this comment to see the full error message
import { host, getStockBucketList } from "../../configs.json";
import {convertListToDropDown} from "../Charts/utils";
import { Button, Paper, Switch, FormLabel, Typography } from "@material-ui/core";
import axios from "axios";

function StockBucketSelect(setter: any,isMulti = false,bucket_name = "stockBucketName") {
  const [options, setoptions] = useState("loading");

  useEffect(() => {
    axios.get(host + getStockBucketList).then((response) => {
      // @ts-expect-error TS(2345): Argument of type '{ label: any; value: any; }[]' i... Remove this comment to see the full error message
      setoptions(convertListToDropDown(response.data.data));
      console.log("options stockbucketlist", convertListToDropDown(response.data.data));
    });
  }, []);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Select
      onChange={(e) => {
        console.log("dropdown updated of stock bucket",e);
        if(isMulti){
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          setter(bucket_name,e["value"]);
        }else{
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          setter(bucket_name,e["value"]);
        }
        
      }}
      defaultValue={options[0]}
      // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'readonly ... Remove this comment to see the full error message
      options={options}
      placeholder="Select Data"
      isMulti = {isMulti}
    />

    </div>
    
  );
}

export default StockBucketSelect;
