import React, { useState } from "react";

import SearchField from "./components/SearchField";
import SearchResult from "./components/SearchResult";

const App = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (searchValue) => {
    console.log(searchValue);
    searchValue.target
      ? setSearch(searchValue.target.value) // If value comes from search field
      : setSearch(searchValue); // If value comes from pressed button in list
  };

  return (
    <>
      <SearchField handleSearch={handleSearch} search={search} />
      <SearchResult search={search} handleSearch={handleSearch} />
    </>
  );
};

export default App;
