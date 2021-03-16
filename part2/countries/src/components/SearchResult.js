import React from "react";

import CountriesList from "./CountriesList";
import CountryDetailed from "./CountryDetailed";

const SearchResult = ({ countries, search }) => {
  const filteredCountriesList = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );
  console.log(filteredCountriesList);
  return (
    <div>
      {filteredCountriesList.length === 1 ? (
        <CountryDetailed country={filteredCountriesList[0]} />
      ) : (
        <CountriesList countries={filteredCountriesList} />
      )}
    </div>
  );
};

export default SearchResult;
