import { Column } from "../common/Table/MuiTable";
import { Job } from "./types";

export const JOB_COLUMNS: Column<Job>[] = [
  { field: "id", title: "ID" },
  { field: "name", title: "Name" },
  { field: "nextRunTime", title: "Next Run Time", valueType: 'DATETIME' },
  { field: "status", title: "Status" },
];

export const POLLING_INTERVAL = 3000;
