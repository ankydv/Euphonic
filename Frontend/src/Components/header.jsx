import "../styles/header.css";
import React from "react";
import SearchBar from "./searchBar";
import Logo from "./logo";
import ProfileIcon from "../Components/profileIcon";

const Header = () => {
  return (
    <div className="header">
      <Logo />
      <SearchBar />
      <ProfileIcon />
    </div>
  );
};

export default Header;
