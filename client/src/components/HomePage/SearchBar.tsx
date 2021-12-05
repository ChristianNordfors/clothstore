import * as React from "react";
import { useDispatch } from "react-redux";
import { putPublications } from "../../redux/actions/publicationActions";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import SearchOrder from "./Order";

function SearchBar() {
  const [text, setText] = React.useState("");
  const dispatch = useDispatch();

  return (
    <Box>
      <TextField
        placeholder="Search"
        type="search"
        variant="standard"
        value={text}
        onChange={(event) => setText(event.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                onClick={(event) => dispatch(putPublications({ name: text }))}
                style={{ cursor: "pointer" }}
              />
            </InputAdornment>
          ),
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") dispatch(putPublications({ name: text }));
        }}
      />
      <SearchOrder/>
    </Box>
  );
}

export default SearchBar;
