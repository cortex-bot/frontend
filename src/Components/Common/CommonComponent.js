// import { Button } from "@material-ui/core";

// const renderShowCode = (params) => {

//     return (<Button variant="contained"
//       color="primary"
//       onClick={(event) => {
//         setOpen(true)
//         setCode_id(params["Strategy Name"])
//       }}     >
//       Code        </Button>);
//   }

//   const renderDeleteRanking = (params) => {

//     return (<Button variant="contained"
//       className="bg-danger"
//       onClick={(event) => {
//         var payload = { strategyName: params["Strategy Name"] };
//         let config={
//           headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
//       }
//         // https://stackoverflow.com/questions/51069552/axios-delete-request-with-request-body-and-headers
//         axios
//           .delete(host + deleteRankingRecord, {data:payload},config)
//           .then((response) => {
//             console.log("delete requested");
//             // if (response.status != "SUCCESS") {
//             //   alert("Failed to delete Ranking Record " + response);
//             // }
//           }
//           );

//       }}     >
//       Delete Strategy</Button>);
//   }
