import React from "react";
import "../styles/searchBar.css";

import { useState } from 'react';
import { NavLink, useSearchParams, useLocation } from 'react-router-dom';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');

  const [searchParams,setSearchParams] = useSearchParams();
  const location = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();
    if(searchParams.get('q')!==searchValue)
      setSearchParams({q:searchValue})
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const shouldNavigate = (event) =>{
    event.stopPropagation();
    if(location.pathname == '/search')
      event.preventDefault();
      event.stopPropagation();
  }
  return (
    <form onSubmit={handleSubmit}>
      <NavLink to="/search" onClick={shouldNavigate}>
      <input
        type="text"
        className="searchBar"
        name="txt"
        value={searchValue}
        onChange={handleChange}
        placeholder="Enter search keyword..."
      />
      </NavLink>
      
        <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
