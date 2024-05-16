import React, { useEffect, useRef } from "react";
import "../styles/searchBar.css";

import { useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { List, TextField, Typography, ListItemButton } from "@mui/material";
import { useTheme } from "@mui/material";

const server = process.env.REACT_APP_SERVER;

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const containerRef = useRef(null);

  useEffect(() => {
    // Attach a click event listener to the document
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsFocus(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    if (searchParams.get("q") !== searchValue)
      setSearchParams({ q: searchValue });
    setIsFocus(false);
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleFocus = () => {
    if(location.pathname!=='/search')
      navigate('/search')
    setIsFocus(true)
  }
  return (
    <div class="searchContainer" ref={containerRef}>
      <div class="searchInput">
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            className="mui-input"
            color="primary"
            id="searchInput" 
            type="text"
            name="txt"
            value={searchValue}
            onChange={handleChange}
            placeholder="What's on your mind?"
            onFocus={handleFocus}
            // onBlur={() => setIsFocus(false)}
          />
        </form>
        {searchValue.trim() && (
          <ResultBox
            searchValue={searchValue}
            setSearchParams={setSearchParams}
            isFocus={isFocus}
            setIsFocus={setIsFocus}
            setSearchValue={setSearchValue}
          />
        )}
      </div>
    </div>
  );
};

const ResultBox = ({ searchValue,setSearchParams, setSearchValue, isFocus, setIsFocus }) => {
  const [suggestions, setSuggestions] = useState();
  const theme = useTheme();

  useEffect(() => {
    if (searchValue) {
      axios.get(`${server}api/searchSuggestions/${searchValue}`)
        .then((res) => {
          setSuggestions(res.data);
        });
    }
  }, [searchValue]);

  const handleClick = (value) => {
    setSearchValue(value);
    setIsFocus(false);
    setSearchParams({ q: value });
  };

  return (
    <List className={`resultBox ${isFocus ? "visible" : "hidden"}`} style={{backgroundColor: theme.palette.background.default}}>
      {suggestions &&
        suggestions.map((suggestion, index) => (
          <ListItemButton key={index} onClick={() => handleClick(suggestion.text)} style={{whiteSpace: 'pre-wrap'}}>
            {suggestion.runs.map((textObj, ind) => (
              <Typography
                key={ind}
                fontWeight = {textObj.bold ? "bold" : "normal"}
              >
                {textObj.text}
              </Typography>
            ))}
          </ListItemButton>
        ))}
    </List>
  );
};
export default SearchBar;
