import React from "react";

import CountriesList from "./CountriesList";
import CountryDetailed from "./CountryDetailed";

const SearchResult = ({
  countries,
  search,
  handleCountry,
  selectedCountry,
}) => {
  const filteredCountriesList = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );
  if (selectedCountry) {
    return (
      <div>
        <CountryDetailed country={selectedCountry} />
      </div>
    );
  } else if (filteredCountriesList.length === 1) {
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
          handleClick={handleCountry}
        />
      </div>
    );
  }
};

export default SearchResult;
