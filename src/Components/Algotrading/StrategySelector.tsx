import React from 'react'
import { host, getStrategyList, getStrategyCode } from "../../configs.json";
import axios from "axios";
import { useState, useEffect } from "react";
import { convertListToDropdown } from "./Utils";
import { Paper, Typography } from "@material-ui/core"
import Select from "react-select";

export function StrategySelector({ setCode,formValues,setFormValues }) {
    const [strategyList, setStrategyList] = useState([]);
    const [strategyName, setStrategyName] = useState(null);

    useEffect(() => {
        axios
            .get(host + getStrategyList)
            .then((response) => {
                console.log("strategy list", response.data.data);
                setStrategyList(convertListToDropdown(response.data.data));
                console.log("strategy list after conversion ", strategyList);
            }
            );
    }, []);

    useEffect(() => {
        console.log("strategy name", strategyName);
        if(strategyName != null){
            axios.get(host + getStrategyCode + "/" + strategyName).then((response) => {
                setCode(response.data.code);
                setFormValues({
                    ...formValues,
                    ['strategy_name']: strategyName,
                    ['description']: response.data.description
                  });
            }
            );
        }
        
    }, [strategyName]);


    return (
        <Paper className="bg-opacity-40 p-4">
            {/* code to write heading in mui  */}
            <Typography variant="h7" className="text-center  text-gray-500 text-bold">
                Select Strategy
            </Typography>
            
            <Select
                onChange={(e) => {
                    setStrategyName(e["value"]);
                }}
                defaultValue={strategyList[0]}
                options={strategyList}
            />
        </Paper>
    )
};


