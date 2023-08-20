import React, { useEffect, useRef } from "react";
import "../styles/searchBar.css";

import { useState } from "react";
import { NavLink, useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";

const server = process.env.REACT_APP_SERVER;

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

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

  const shouldNavigate = (event) => {
    event.stopPropagation();
    if (location.pathname == "/search") event.preventDefault();
    event.stopPropagation();
  };
  return (
    <div class="searchContainer" ref={containerRef}>
      <div class="searchInput">
        <form onSubmit={handleSubmit} autoComplete="off">
          <NavLink to="/search" onClick={shouldNavigate}>
            <input
              id="searchInput"
              type="text"
              name="txt"
              value={searchValue}
              onChange={handleChange}
              placeholder="Enter search keyword..."
              onFocus={() => setIsFocus(true)}
              // onBlur={() => setIsFocus(false)}
            />
          </NavLink>
        </form>
        {searchValue && (
          <ResultBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            handleSubmit={handleSubmit}
            isFocus={isFocus}
          />
        )}
        <button type="submit" onClick={handleSubmit} className="icon">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>
  );
};

const ResultBox = ({ searchValue, setSearchValue, handleSubmit, isFocus }) => {
  const [suggestions, setSuggestions] = useState();

  useEffect(() => {
    if (searchValue) {
      axios.get(`${server}api/searchSuggestions/${searchValue}`).then((res) => {
        setSuggestions(res.data);
      });
    }
  }, [searchValue]);

  const handleClick = (value) => {
    setSearchValue(value);
    handleSubmit();
  };

  return (
    <div className={`resultBox ${isFocus ? "visible" : "hidden"}`}>
      {suggestions &&
        suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleClick(suggestion.text)}>
            {suggestion.runs.map((textObj, ind) => (
              <text
                key={ind}
                style={{ fontWeight: textObj.bold ? "bold" : "normal" }}
              >
                {textObj.text}
              </text>
            ))}
          </li>
        ))}
    </div>
  );
};
export default SearchBar;
