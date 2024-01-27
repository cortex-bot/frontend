import { Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { isFunction } from "lodash";
import { ChangeEvent } from "react";

type PropTypes = {
  title: string;
  enableSearch?: boolean;
  searchTerm?: string;
  updateSearchTerm?: (searchTerm: string) => void;
};

const TitleBar = (props: PropTypes) => {
  const { title, searchTerm, updateSearchTerm } = props;

  const handleSearchTermChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (isFunction(updateSearchTerm)) {
      updateSearchTerm(event.target.value);
    }
  };
  return (
    <Box sx={{ display: "flex", p: "15px" }}>
      <Typography variant="h6">{title}</Typography>
      <TextField
        id="search-bar-text-field"
        placeholder="Search"
        variant="standard"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={searchTerm}
        onChange={handleSearchTermChange}
        sx={{ marginLeft: "auto" }}
      />
    </Box>
  );
};

export default TitleBar;
