import React, { useEffect, useState } from "react";
import { Paper, TextField } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { fetchAccount } from "../lib/appwrite/apis";
import { Link } from "react-router-dom";
import _ from "lodash";
function SearchBar() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchAccounts = async () => {
    try {
      const result = await fetchAccount(search);
      setSearchResults(result);
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedFetch = _.debounce(fetchAccounts, 500);

  useEffect(() => {
    if (search.length > 0) {
      debouncedFetch();
    } else {
      setSearchResults([]);
    }
  }, [search]);
  return (
    <Paper className={`flex items-center relative font-varela rounded-b-none mb-4`}>
      {
        <SearchOutlined
          className="text-primary-light"
          sx={{
            position: "absolute",
            right: "1rem",
            width: "2rem",
            height: "2rem",
          }}
        />
      }
      <TextField
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search people"
        name="search"
        id="search"
        color="secondary"
        variant="outlined"
        fullWidth
      />
      <div className={`${searchResults.length > 0 ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"} transition-all list-none w-full absolute rounded rounded-t-none bg-white top-14  border-t-0 z-50`}>
          {searchResults.map((result) => (
            <Link to={`/profile/${result.accountid}`}>
              <li className="flex gap-5 w-full cursor-pointer hover:bg-gray-300 transition-all p-3">
                <img
                  src={result.profileimageurl}
                  className="w-10 h-10 rounded-full"
                ></img>
                <p className="flex flex-col text-sm">
                  <span>{result.name}</span>
                  <span>{result.username}</span>
                </p>
              </li>
            </Link>
          ))}
        </div>
    </Paper>
  );
}

export default SearchBar;
