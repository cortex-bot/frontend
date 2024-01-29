import zIndex from "@mui/material/styles/zIndex";
import { useCallback, useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";
import {
  filter,
  forEach,
  has,
  includes,
  isFunction,
  lowerCase,
  map,
  noop,
  orderBy,
  partial,
  size,
  slice,
  some,
  sortBy,
} from "lodash";
import React from "react";
import TitleBar from "./TitleBar";
import { createTheme, TablePagination } from "@mui/material";
import { DateTime } from "luxon";

type OrderType = "asc" | "desc";
type ValueType = "TEXT" | "DATETIME";

export type Column<T> = {
  field?: string;
  title: string;
  valueType?: ValueType;
  render?: (rowData: T) => Element;
};

type PropTypes<T> = {
  title: string;
  data: T[];
  columns: Column<T>[];
  config?: any;
};

const MuiTable = <T,>(props: PropTypes<T>) => {
  const { title, data, columns, config = {} } = props;

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [order, setOrder] = useState<OrderType>("asc");
  const [orderByColumnkey, setOrderByColumnKey] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  const updateSortByColumn = useCallback(
    (columnKey: string) => {
      if (columnKey === orderByColumnkey) {
        setOrder(order === "asc" ? "desc" : "asc");
        return;
      }

      setOrderByColumnKey(columnKey);
      setOrder("asc");
    },
    [order, orderByColumnkey]
  );

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(event.target.value);
  };

  const headerRow = useMemo(
    () =>
      map(columns, (column) => {
        const { field: columnKey, title } = column;
        const columnActive = orderByColumnkey === columnKey;
        const columnSortable = columnKey && has(data?.[0], columnKey);

        const cellContent = columnSortable ? (
          <TableSortLabel
            active={columnSortable && columnActive}
            direction={columnActive ? order : "asc"}
            onClick={partial(updateSortByColumn, column.field)}
          >
            {columnSortable && columnActive && (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            )}
            {title}
          </TableSortLabel>
        ) : (
          title
        );

        return (
          <TableCell sx={{ background: "#296E85", color: "#fff" }}>
            {cellContent}
          </TableCell>
        );
      }),
    [columns, data, order, orderByColumnkey, updateSortByColumn]
  );

  const columnKeys = useMemo(() => map(columns, "field"), [columns]);

  const filteredRows = useMemo(
    () =>
      filter(data, (row) => {
        return some(columnKeys, (columnKey) =>
          includes(lowerCase(row[columnKey]), lowerCase(searchTerm))
        );
      }),
    [data, columnKeys, searchTerm]
  );

  const sortedFilteredRows = useMemo(
    () => orderBy(filteredRows, [orderByColumnkey], order),
    [filteredRows, order, orderByColumnkey]
  );

  const paginatedSortedFilteredRows = useMemo(() => {
    const startIndex = rowsPerPage * page;
    const endIndex = startIndex + rowsPerPage;
    return slice(sortedFilteredRows, startIndex, endIndex);
  }, [page, rowsPerPage, sortedFilteredRows]);

  const gridRows = useMemo(
    () =>
      map(paginatedSortedFilteredRows, (row, index) => {
        return (
          <TableRow key={index}>
            {map(columns, (column) => {
              const { field, render, valueType } = column;
              const cellContent = isFunction(render)
                ? render(row)
                : valueType === "DATETIME"
                ? getFormattedDateTime(row[field])
                : row[field];

              return <TableCell>{cellContent}</TableCell>;
            })}
          </TableRow>
        );
      }),
    [paginatedSortedFilteredRows, columns]
  );

  return (
    <Paper sx={{ minHeight: 0, display: "flex", flexDirection: "column" }}>
      <TitleBar
        title={title}
        searchTerm={searchTerm}
        updateSearchTerm={setSearchTerm}
      />
      <TableContainer component={Box} sx={{ minHeight: "400px" }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#296E85" }}>
            <TableRow>{headerRow}</TableRow>
          </TableHead>
          <TableBody>{gridRows}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={size(sortedFilteredRows)}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        sx={{ flexShrink: "0" }}
      />
    </Paper>
  );
};

const getFormattedDateTime = (isoDateTime: string) => {
  return DateTime.fromISO(isoDateTime).toLocaleString(DateTime.DATETIME_MED);
};

export default MuiTable;
