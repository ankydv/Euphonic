import "./header.css";
import React from "react";
import SearchBar from "../search/searchBar";
import Logo from "../logo/logo";
import ProfileIcon from "../profile/profileIcon";

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
