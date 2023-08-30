
import { Button } from "@material-ui/core";
// import {Button} from '@mui/material/Button';
import { useEffect, useState } from "react";
import axios from "axios";
import { getColumns } from "../../utils/utils";
// @ts-expect-error TS(2732): Cannot find module '../../configs.json'. Consider ... Remove this comment to see the full error message
import { host, getStrategyCodeFromRanking, getRankingDataList, deleteRankingRecord } from "../../configs.json";
// import ShowCode from "./ShowCode";

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
// @ts-expect-error TS(6142): Module '../Algotrading/Editor' was resolved to 'D:... Remove this comment to see the full error message
import Editor from '../Algotrading/Editor'
import MuiTable from '../../utils/MuiTable'

const ShowCodeModal = (e: any) => {
  // console.log("logs",e)
  return (
    alert("code is " + e)
  );
}


// make styles
const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));




function Ranking() {

  const classes = useStyles();
  const [data, setdata] = useState([]);
  const [columns, setcolumns] = useState([]);

  const [open, setOpen] = useState(false);
  const [code_id, setCode_id] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Modal view
  const renderShowCode = (params: any) => {

    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (<Button variant="contained"
      color="primary"
      onClick={(event) => {
        setOpen(true)
        setCode_id(params["Strategy Name"])
      }}     >
      Code        </Button>);
  }

  const renderDeleteRanking = (params: any) => {

    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (<Button variant="contained"
      className="bg-danger"
      onClick={(event) => {
        var payload = { strategyName: params["Strategy Name"] };
        let config={
          headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
      }
        // https://stackoverflow.com/questions/51069552/axios-delete-request-with-request-body-and-headers
        axios
          // @ts-expect-error TS(2554): Expected 1-2 arguments, but got 3.
          .delete(host + deleteRankingRecord, {data:payload},config)
          .then((response) => {
            console.log("delete requested");
            // if (response.status != "SUCCESS") {
            //   alert("Failed to delete Ranking Record " + response);
            // }
          }
          );

      }}     >
      Delete Strategy</Button>);
  }

  const renderAnalysis = (params: any) => {
    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Button variant="contained"
        color="secondary"
        onClick={(event) => {
          ShowCodeModal(params.id)
        }}
      >
        Analysis
      </Button>
    );
  }

  //  modal view end

  const additionalColumn = [{
    title: 'Show code', field: 'code',
    render: renderShowCode,
    disableClickEventBubbling: true,
  },
  {
    title: 'Delete Ranking ', field: 'deleteRanking',
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
  ]


  // const FetchURL = host + getUserInvestmentData + 'buy/alvin369' ;


  useEffect(() => {
    const FetchURL = host + getRankingDataList;
    (async () => {

      const result = await axios(FetchURL);
      if(result.data.response.length === 0) {
        console.log("null data");
        return;
      }
      setdata(result.data.response);
      var cols = getColumns(result.data.response);
      cols.push(...additionalColumn);

      setcolumns(cols);
      console.log("column ", columns);
      console.log("data ", data);

    })();
  }, []);


  // get code 
  const [code, setCode] = useState(null);


  // get the code for the strategy..
  useEffect(() => {
    (async () => {
      // const FetchURL_fetch_code = host + getStrategyCodeFromRanking + code_id + "/";

      const FetchURL_fetch_code = host + getStrategyCodeFromRanking;

      if (code_id != null) {
        const payload = { "strategyName": code_id }
        const result = await axios.post(FetchURL_fetch_code, payload);
        setCode(result.data.response);
      }


      // setCode("import os")
      // console.log(code);
    })();
  }, [code_id]);




  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  const notFound = <div className="loading">Loading data</div>;

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div>

      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Fade in={open}>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className="w-4/5 h-3/4 bg-gray-600 text-white">
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <h1>Code</h1>

            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Editor code={code} setCode={setCode} />
          </div>
        </Fade>
      </Modal>

      {data && columns ? MuiTable("Ranking", data, columns) : notFound}
    </div>
    // </div>
  );
}

export default Ranking;