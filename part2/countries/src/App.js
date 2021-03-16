import React, { useState, useEffect } from "react";
import axios from "axios";

import SearchField from "./components/SearchField";
import SearchResult from "./components/SearchResult";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <SearchField handleSearch={handleSearch} search={search} />
      <SearchResult countries={countries} search={search} />
    </>
  );
};

export default App;
