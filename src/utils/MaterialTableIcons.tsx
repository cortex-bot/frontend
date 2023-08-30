import React, { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

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
