
import MaterialTable from "material-table";

// @ts-expect-error TS(6142): Module './MaterialTableIcons' was resolved to 'D:/... Remove this comment to see the full error message
import tableIcons from "./MaterialTableIcons";
import "./MuiTables.css";
import zIndex from "@material-ui/core/styles/zIndex";

const MuiTable =(title: any,data: any,columns: any,config = {})=> (
// @ts-expect-error TS(2304): Cannot find name 'div'.
<div>
    // @ts-expect-error TS(2314): Generic type 'MaterialTable<RowData>' requires 1 t... Remove this comment to see the full error message
    <MaterialTable
      title={title}
      // @ts-expect-error TS(2304): Cannot find name 'data'.
      data={data}
      // @ts-expect-error TS(2304): Cannot find name 'icons'.
      icons={tableIcons}
      // @ts-expect-error TS(2304): Cannot find name 'columns'.
      columns={columns}
      // @ts-expect-error TS(2552): Cannot find name 'options'. Did you mean 'Option'?
      options={{
        // @ts-expect-error TS(2695): Left side of comma operator is unused and has no s... Remove this comment to see the full error message
        toolbarButtonAlignment: "left",
        // @ts-expect-error TS(2304): Cannot find name 'searchAutoFocus'.
        searchAutoFocus: true,
        // @ts-expect-error TS(2304): Cannot find name 'minBodyHeight'.
        minBodyHeight: "70vh",
        // @ts-expect-error TS(2304): Cannot find name 'maxBodyHeight'.
        maxBodyHeight: "80vh",
        // @ts-expect-error TS(2304): Cannot find name 'pageSize'.
        pageSize:20,
        // selection: true,
        // @ts-expect-error TS(2304): Cannot find name 'headerStyle'.
        headerStyle: {
          // @ts-expect-error TS(2695): Left side of comma operator is unused and has no s... Remove this comment to see the full error message
          backgroundColor: "#02349b",
          // @ts-expect-error TS(2304): Cannot find name 'color'.
          color: "#FFF",
          // @ts-expect-error TS(2304): Cannot find name 'config'.
          zIndex:config.zIndex

      },
      header: {
        // @ts-expect-error TS(2695): Left side of comma operator is unused and has no s... Remove this comment to see the full error message
        position: 'sticky',
        // @ts-expect-error TS(2695): Left side of comma operator is unused and has no s... Remove this comment to see the full error message
        top: 0,
    },

      // @ts-expect-error TS(2695): Left side of comma operator is unused and has no s... Remove this comment to see the full error message
      tableLayout: "fixed",
      // @ts-expect-error TS(2304): Cannot find name 'rowStyle'.
      rowStyle: {
        overflowWrap: 'break-word'
    },
        // @ts-expect-error TS(2695): Left side of comma operator is unused and has no s... Remove this comment to see the full error message
        scrollY:true,
        // @ts-expect-error TS(2304): Cannot find name 'paging'.
        paging: true,
      }}
      // @ts-expect-error TS(2304): Cannot find name 'components'.
      components={{
        
      }}

    />
    </div>
  );

export default MuiTable;