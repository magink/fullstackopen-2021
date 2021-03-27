import React from "react";

const Search = ({ onSearch, search }) => {
  return (
    <>
      <span>filter shown with </span>
      <input
        onChange={onSearch}
        type="search"
        placeholder="Search.."
        value={search}
      />
    </>
  );
};

export default Search;
