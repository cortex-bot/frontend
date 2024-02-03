import { Box } from "@mui/system";
import { getAllOrders } from "../../api/orders/requests";
import MuiTable from "../common/Table/MuiTable";
import { ORDER_COLUMNS } from "./consts";

const OrdersDashboard = () => {
  const { data: orders = [], isSuccess: ordersLoaded } = getAllOrders();
  return (
    <Box
      sx={{
        p: "20px",
        maxHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {ordersLoaded && (
        <MuiTable title="Orders" data={orders} columns={ORDER_COLUMNS} />
      )}
    </Box>
  );
};

export default OrdersDashboard;
