import React, { useState } from "react";
import {
  Button,
  Paper,
  Switch,
  FormLabel,
  Typography,
  Box,
  Grid,
  FormControlLabel,
} from "@mui/material";
import HighchartsDependencies from "../../utils/HighchartDependencies";
import Editor from "./Editor";
import StrategyConfigPanel from "./StrategyConfigPanel";
import TradeChart from "./TradeChart";
import { StrategySelector } from "./StrategySelector";
import { template } from "./default_template.json";
import "./styles/Algotrading.css";
import { map } from "lodash";
import AnalysisBox from "./AnalysisBox";
import { useAppStore } from "../../stores/store";

function Algotrading() {
  const [analysis, setAnalysis] = useState(null);
  const [isCandleStickChart, setIsCandleStickChart] = useState(true);
  const code = useAppStore((state) => state.code);
  const setCode = useAppStore((state) => state.setCode);

  const updateCandleStickChart = (e: any) => {
    setIsCandleStickChart(e.target.checked);
  };

  return (
    <Grid container spacing={2} sx={{ p: "10px", height: "100vh" }}>
      <Grid item xs={12} sm={9} sx={{ height: "50%" }}>
        <TradeChart isCandleStickChart={isCandleStickChart} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "50%",
          gap: "10px",
        }}
      >
        <AnalysisBox analysis={analysis} />
        <Paper sx={{ display: "flex", alignItems: "center", px: "1rem" }}>
          <FormControlLabel
            control={
              <Switch
                checked={isCandleStickChart}
                onChange={updateCandleStickChart}
              />
            }
            label="Candle Stick Chart"
          />
        </Paper>
      </Grid>

      <Grid item xs={12} sm={9} sx={{ height: "50%" }}>
        <Editor code={code} setCode={setCode} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={3}
        sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <StrategySelector />
        <StrategyConfigPanel />
      </Grid>
    </Grid>
  );
}

export default Algotrading;
