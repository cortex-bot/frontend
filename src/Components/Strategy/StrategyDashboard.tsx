import MuiTable from "../common/Table/MuiTable";
// @ts-expect-error TS(2732): Cannot find module '../../configs.json'. Consider ... Remove this comment to see the full error message
import {
  host,
  strategyMetadataList,
  deleteStrategy,
  getStrategyCode,
} from "../../configs.json";
import { useEffect, useState } from "react";
import axios from "axios";
import { getColumns } from "../../utils/utils";
import { Box, Button } from "@mui/material";

import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
// @ts-expect-error TS(6142): Module '../Algotrading/Editor' was resolved to 'D:... Remove this comment to see the full error message
import Editor from "../Algotrading/Editor";
import "./StrategyDashboard.css";

const ShowCodeModal = (e: any) => {
  // console.log("logs",e)
  return alert("code is " + e);
};

export default function StrategyDashboard() {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [page_size, setpage_size] = useState(100);
  const [page_number, setpage_number] = useState(0);

  const [open, setOpen] = useState(false);
  const [code_id, setCode_id] = useState(null);

  // get code
  const [code, setCode] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Modal view
  const renderShowCode = (params: any) => {
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={(event) => {
          setOpen(true);
          setCode_id(params["strategy_name"]);
          console.log("setting the code id to " + params["strategy_name"]);
        }}
      >
        Code{" "}
      </Button>
    );
  };

  const renderDeleteRanking = (params: any) => {
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (
      <Button
        variant="contained"
        color="error"
        onClick={(event) => {
          var payload = { strategy_name: params["strategy_name"] };
          let config = {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          };
          // https://stackoverflow.com/questions/51069552/axios-delete-request-with-request-body-and-headers
          axios
            // @ts-expect-error TS(2554): Expected 1-2 arguments, but got 3.
            .delete(host + deleteStrategy, { data: payload }, config)
            .then((response) => {
              console.log("delete requested");
              // if (response.status != "SUCCESS") {
              //   alert("Failed to delete Ranking Record " + response);
              // }
            });
        }}
      >
        Delete Strategy
      </Button>
    );
  };

  const renderAnalysis = (params: any) => {
    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Button
        variant="contained"
        color="secondary"
        onClick={(event) => {
          ShowCodeModal(params.id);
        }}
      >
        Analysis
      </Button>
    );
  };

  //  modal view end

  const additionalColumn = [
    {
      title: "Show code",
      field: "code",
      render: renderShowCode,
      disableClickEventBubbling: true,
    },
    {
      title: "Delete Ranking ",
      field: "deleteRanking",
      render: renderDeleteRanking,
      disableClickEventBubbling: true,
    },
    // add analysis button on the table for each row.
    // {
    //   title: ' ', field: 'analysis',
    //   render: renderAnalysis,
    //   // padding: 0,
    //   // margin: 0,
    //   // disableClickEventBubbling: true,
    // },
  ];

  useEffect(() => {
    const apiUrl = host + strategyMetadataList; // http://127.0.0.1:8080/api/v1/strategy/get-all-strategy-metadata';
    const requestData = {
      page_size: page_size,
      page_number: page_number,
    };

    axios.post(apiUrl, requestData).then((result) => {
      console.log("strategy result log", result);
      setData(result.data);

      // console.log("strategy data",data);/
      var cols = getColumns(result.data);

      cols.push(...additionalColumn);
      setColumns(cols);
    });

    // axios.get(dataService + stockSymbol).then((response) => {
    //   setoptions(convertStocksMappingToArray(response.data.data));
    // console.log("options", options);
    // });
  }, [page_number, page_size]);

  // get the code for the strategy..
  useEffect(() => {
    (async () => {
      // const FetchURL_fetch_code = host + getStrategyCodeFromRanking + code_id + "/";

      const FetchURL_fetch_code = host + getStrategyCode + "/" + code_id;

      if (code_id != null) {
        const result = await axios.get(FetchURL_fetch_code);
        setCode(result.data.code);
      }
    })();
  }, [code_id]);

  return (
    <Box
      sx={{
        p: "20px",
        maxHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Fade in={open}>
          <div className="code-modal">
            <h1>Code</h1>

            <Editor code={code} setCode={setCode} />
          </div>
        </Fade>
      </Modal>

      {/* this is causing issue */}
      {<MuiTable title={"Strategy Dashboard"} data={data} columns={columns} />}
    </Box>
  );
}
