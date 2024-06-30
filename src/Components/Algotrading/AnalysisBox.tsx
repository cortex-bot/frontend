import React, { useCallback } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { isEmpty, map } from "lodash";

interface AnalysisProps {
  analysis: Record<string, any>;
}

const AnalysisBox = ({ analysis }: AnalysisProps) => {
  const getAnalysisDetails = useCallback(() => {
    if (isEmpty(analysis)) {
      return <Typography align="center">Strategy not executed yet</Typography>;
    }

    return map(analysis, (value, key) => (
      <Box sx={{ display: "flex", flexDirection: "row", my: 1 }} key={key}>
        <Typography sx={{ fontWeight: "bold", mr: 2 }}>{key}:</Typography>
        <Typography>
          {typeof value === "number"
            ? Math.round(value * 1000) / 1000
            : String(value)}
        </Typography>
      </Box>
    ));
  }, [analysis]);

  return (
    <Paper
      sx={{
        p: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        overflowY: "auto",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: "bold",
        }}
        variant="h6"
      >
        Analysis
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflowY: "auto",
        }}
      >
        {getAnalysisDetails()}
      </Box>
    </Paper>
  );
};

export default AnalysisBox;
