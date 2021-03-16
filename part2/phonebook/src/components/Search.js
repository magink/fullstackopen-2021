import React from "react";

const Search = ({ handleSearch, search }) => {
  return (
    <>
      <span>filter shown with </span>
      <input
        onChange={handleSearch}
        type="search"
        placeholder="Search.."
        value={search}
      />
    </>
  );
};

export default Search;
