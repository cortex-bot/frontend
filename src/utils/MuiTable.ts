
import MaterialTable from "material-table";

import tableIcons from "./MaterialTableIcons";
import "./MuiTables.css";
import zIndex from "@material-ui/core/styles/zIndex";

const MuiTable =(title,data,columns,config = {})=> (
<div>
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
        pageSize:20,
        // selection: true,
        headerStyle: {
          backgroundColor: "#02349b",
          color: "#FFF",
          zIndex:config.zIndex

      },
      header: {
        position: 'sticky',
        top: 0,
    },

      tableLayout: "fixed",
      rowStyle: {
        overflowWrap: 'break-word'
    },
        scrollY:true,
        paging: true,
      }}
      components={{
        
      }}

    />
    </div>
  );

export default MuiTable;