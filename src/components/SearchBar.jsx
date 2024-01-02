import React from "react";
import { Paper, TextField } from "@mui/material";
import { Comment, SearchOutlined } from "@mui/icons-material";
function SearchBar({ search, setSearch, use, addComment }) {
  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  return (
    <Paper
      className={`${
        use == "comments" ? "h-20" : "h-16"
      } overflow-hidden flex items-center drop-shadow-form`}
      square
      sx={{
        backgroundColor: "primary.light",
        ":focus-within": {
          border: "1px solid #ebe8e888",
        },
        border: "1px solid #fff2",
      }}
    >
      {
        use!=='comments' && <SearchOutlined
          sx={{
            color: "#ebe8e877",
            position: "absolute",
            translate: "15px -2px",
            width: "2.3rem",
            height: "2.3rem",
          }}
        />
      }
      <TextField
        value={search}
        onChange={handleChange}
        placeholder= {`${use=='comments' ? "Add a comment" : "Search"}`}
        name="location"
        id="location"
        variant="outlined"
        fullWidth
        InputProps={{
          sx: {
            fontSize: 26,
            borderRadius: 0,
            color: "white",
            paddingX: use=='comments' ? "0rem" : "3rem",
          },
        }}
      />
      {
        use == 'comments' && <buttton onClick={() => addComment()} className="absolute right-6 cursor-pointer hover:text-white text-white/50"><Comment fontSize='large' /></buttton>
      }
    </Paper>
  );
}

export default SearchBar;
