import MaterialTable from "material-table";

// @ts-expect-error TS(6142): Module './MaterialTableIcons' was resolved to 'D:/... Remove this comment to see the full error message
import tableIcons from "./MaterialTableIcons";
import "./MuiTables.css";
import zIndex from "@mui/material/styles/zIndex";

const MuiTable = (props: any) => {
  const { title, data, columns, config = {} } = props;

  return (
      <MaterialTable
        title={title}
        data={data}
        icons={tableIcons}
        columns={columns}
        options={{
          toolbarButtonAlignment: "left",
          searchAutoFocus: true,
          minBodyHeight: "70vh",
          maxBodyHeight: "80vh",
          pageSize: 20,
          headerStyle: {
            backgroundColor: "#02349b",
            color: "#FFF",
            zIndex: config.zIndex,
          },
          header: {
            position: "sticky",
            top: 0,
          },

          tableLayout: "fixed",
          rowStyle: {
            overflowWrap: "break-word",
          },
          scrollY: true,
          paging: true,
        }}
        components={{}}
      />
  );
};

export default MuiTable;
