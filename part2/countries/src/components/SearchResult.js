import React, { useState, useEffect } from "react";
import axios from "axios";

import CountriesList from "./CountriesList";
import CountryDetailed from "./CountryDetailed";

const SearchResult = ({ search, handleSearch }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filteredCountriesList = countries.filter((country) => {
    return country.name.toLowerCase().includes(search.toLowerCase());
  });

  if (filteredCountriesList.length === 1) {
    return (
      <div>
        <CountryDetailed country={filteredCountriesList[0]} />
      </div>
    );
  } else {
    return (
      <div>
        <CountriesList
          countries={filteredCountriesList}
          handleClick={handleSearch}
        />
      </div>
    );
  }
};

export default SearchResult;
