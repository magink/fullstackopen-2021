import React from "react";

const Search = ({ handleSearch, search }) => {
  return (
    <input
      onChange={handleSearch}
      type="search"
      placeholder="Search.."
      value={search}
    />
  );
};

export default Search;
