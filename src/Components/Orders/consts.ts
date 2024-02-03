import { Order } from "../../api/orders/types";
import { Column } from "../common/Table/MuiTable";

export const ORDER_COLUMNS: Column<Order>[] = [
  { field: "order_id", title: "ID" },
  { field: "reference_id", title: "Executor ID" },
  { field: "product_type", title: "Product Type" },
  { field: "trading_symbol", title: "Trading Symbol" },
  { field: "price", title: "Price" },
  { field: "quantity", title: "Quantity" },
  { field: "transaction_type", title: "Transaction Type" },
  { field: "status", title: "Status" },
  { field: "user_account_id", title: "User" },
  { field: "created_at", title: "Creation Time", valueType: "DATETIME" },
];
