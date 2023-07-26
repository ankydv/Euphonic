import React from "react";
import "../styles/searchBar.css";

import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');

  const [searchParams,setSearchParams] = useSearchParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    if(searchParams.get('q')!==searchValue)
      setSearchParams({q:searchValue})
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="searchBar"
        name="txt"
        value={searchValue}
        onChange={handleChange}
        placeholder="Enter search keyword..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
