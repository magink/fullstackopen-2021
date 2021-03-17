import React, { useState, useEffect } from "react";
import axios from "axios";

import SearchField from "./components/SearchField";
import SearchResult from "./components/SearchResult";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  console.log("selected", selectedCountry);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setSelectedCountry("");
  };

  const handleCountry = (country) => {
    setSelectedCountry(country);
  };

  return (
    <>
      <SearchField handleSearch={handleSearch} search={search} />
      <SearchResult
        handleCountry={handleCountry}
        countries={countries}
        search={search}
        selectedCountry={selectedCountry}
      />
    </>
  );
};

export default App;
