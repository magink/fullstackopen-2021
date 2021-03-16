import React from "react";

const SearchField = ({ handleSearch, search }) => {
  return (
    <>
      <span>Search for countries</span>
      <input
        onChange={handleSearch}
        type="search"
        placeholder="Search for country.."
        value={search}
      />
    </>
  );
};

export default SearchField;
