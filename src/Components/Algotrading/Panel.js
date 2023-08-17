import { Button, Paper, Switch, FormLabel, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import StockSelect from "./StockSelect";
import Select from "react-select";
import { convertListToDropdown,convertDictListToDropdown } from '../Algotrading/Utils';

import SelectStockBasektType from "./SelectStockBasketType";
// import { getTodaysDate, getExtraCharges } from "../utils";
import { host, executeStrategy, saveStrategy,getIntervalList } from "../../configs.json";
import { convertFormValuesToPayload } from "./Utils";
import { useEffect,useState } from "react";



export default function Panel({ username, formValues, setFormValues, code, settrades, setAnalysis, description }) {

  //   const handleReset = () => setFormValues(defaultValues);

  const [intervalList, setIntervalList] = useState([]);

  useEffect(() => {


    axios
      .get(host + getIntervalList)
      .then((response) => {
        console.log("response for interval list: " + response);
        setIntervalList(convertListToDropdown(response.data.data));
      }
      );


  },[]);

  const handleSubmit = () => {

    // console.log("Code Pushed");
    if (formValues.strategy_name === "") alert("Please enter Strategy name")
    if (formValues.start_date === "") alert("Please enter start_date ")
    if (formValues.end_date === "") alert("Please enter end_date")
    if (formValues.interval === "") alert("Please select Interval")

    // ------------------------ Create the payload from the form values -------------------------
    let payload = convertFormValuesToPayload(formValues);
    console.log("post request", payload)
    payload['strategy_code'] = code;
    payload["backtestEngine"] = "simple_engine";
    
    if(localStorage.getItem("username")!=null){
      payload["username"] = localStorage.getItem("username")
      if(localStorage.getItem("brokerDetails") !=null)
        payload["broker_name"] = JSON.parse(localStorage.getItem("brokerDetails"))["name"]
      // payload["interval"] = "1d";
      console.log("post request upd", payload)
    }
    



    axios
      .post(host + executeStrategy, payload)
      .then((response) => {
        console.log("trade data", response.data);

        if (response.data.status == "SUCCESS") {

        if (response.data.data == "RANKING") {
          // console.log("trades received from server",response.data.trades)
          // alert("Strategy Sent To Queue..");
          alert("Strategy Executed and Updated in Ranking");
        }else{
          // console.log("trades received from server",response.data.trades)

          // console.log("backtest received from server",response.data.backtestResult)
          settrades(response.data.data.trades);
          delete response.data.data.trades;
          setAnalysis(response.data.data);
        }
      }


        else {
          alert("Error: " + response.data.error_description)
        }

      })
      .catch((error) => alert("Algo trade data " + error));
  };


  // save the code using the api providede by analysis service.
  const saveCode = () => {

    // create payload.
    var payload = {
      code: code, strategy_name: formValues.strategy_name,
      username: formValues.username == null ? localStorage.getItem("username") : "Anonymous",
      description: formValues.description
    }


    console.log("view payload", payload)

    axios
      .post(host + saveStrategy, payload)
      .then((response) => {
        console.log("strategy save response", response);
        if (response.data.status == 'success'.toUpperCase())
          alert("Strategy Saved, id = " + response.data.data.strategy_id);
        else alert("failed to save the strategy")
      })


      .catch((error) => alert(error));

  };



  // common functino to handle the change in the formValues.

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



  const handleChangeSwitch = (e) => {
    const { name, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: checked,
    });

    // console.log(formValues);
  };

  const selectDropdown = (name, value) => {
    let d = {};
    d["target"] = {};
    d["target"]["name"] = name;
    d["target"]["value"] = value;
    handleChange(d);
  };

  return (
    <Paper className="bg-opacity-40 p-4 h-100" >
      {/* style="height:100%; width:100%;"> */}
      <Typography variant="h7" className="text-center text-gray-500 text-bold">
        Select Data
      </Typography>
      {StockSelect(selectDropdown)}



      <div className="grid md:grid-cols-2 md:grid-rows-2 gap-2 mt-3">

        <div>
          <FormLabel children={"Ranking"} />
          <Switch
            color="secondary"
            // checked={formValues.ranking}
            name="ranking"
            onChange={handleChangeSwitch}
            // value={formValues.ranking}
            label={"Use code for Ranking Service"}
          />

        </div>
        <div>
        <Select
          onChange={(e) => selectDropdown("interval",e.value)}
          placeholder="Interval"
          name="interval"
          isRequired={true}
          defaultValue={intervalList[0]}
          options={intervalList}
        />
       
        </div>


        {SelectStockBasektType(selectDropdown)}

      </div>


      <div className="grid md:grid-rows-2 gap-3 mt-3" 
      style={{ backgroundColor: 'rgba(144, 238, 144, 0.5)' }}>
        <TextField
          onChange={handleChange}
          name="start_date"
          type="datetime-local"
          value={formValues.start_date}
          label={"Start Date"}
        />

        <TextField
          onChange={handleChange}
          name="end_date"
          type="datetime-local"
          value={formValues.end_date}
          label={"End Date"}
        /> 

      </div>

      <div className="grid">
        <TextField
          onChange={handleChange}
          name="strategy_name"
          type="input"
          value={formValues.strategy_name}
          label={"Strategy name"}
          required
        />

        {/*  not saved right now */}
        <TextField
          onChange={handleChange}
          name="description"
          multiline="true"
          type="textarea"
          value={formValues.description}
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

