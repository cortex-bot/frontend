import React, { forwardRef } from "react";

import AddBox from "@mui/icons-material/AddBox";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import Check from "@mui/icons-material/Check";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Clear from "@mui/icons-material/Clear";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Edit from "@mui/icons-material/Edit";
import FilterList from "@mui/icons-material/FilterList";
import FirstPage from "@mui/icons-material/FirstPage";
import LastPage from "@mui/icons-material/LastPage";
import Remove from "@mui/icons-material/Remove";
import SaveAlt from "@mui/icons-material/SaveAlt";
import Search from "@mui/icons-material/Search";
import ViewColumn from "@mui/icons-material/ViewColumn";

const tableIcons = {
  // @ts-expect-error TS(2769): No overload matches this call.
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  // @ts-expect-error TS(2769): No overload matches this call.
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  // @ts-expect-error TS(2769): No overload matches this call.
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  // @ts-expect-error TS(2769): No overload matches this call.
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  // @ts-expect-error TS(2769): No overload matches this call.
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  // @ts-expect-error TS(2769): No overload matches this call.
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  // @ts-expect-error TS(2769): No overload matches this call.
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  // @ts-expect-error TS(2769): No overload matches this call.
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  // @ts-expect-error TS(2769): No overload matches this call.
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  // @ts-expect-error TS(2769): No overload matches this call.
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  // @ts-expect-error TS(2769): No overload matches this call.
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  // @ts-expect-error TS(2769): No overload matches this call.
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  // @ts-expect-error TS(2769): No overload matches this call.
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  // @ts-expect-error TS(2769): No overload matches this call.
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  // @ts-expect-error TS(2769): No overload matches this call.
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  // @ts-expect-error TS(2769): No overload matches this call.
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  // @ts-expect-error TS(2769): No overload matches this call.
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default tableIcons;
