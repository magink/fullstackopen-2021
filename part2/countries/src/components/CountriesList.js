import React from "react";

const CountriesList = ({ countries }) => {
  return (
    <>
      <ul>
        {countries.length > 10 ? (
          <li>Too many matches, specify another filter</li>
        ) : (
          countries.map((country) => (
            <li key={country.numericCode}>{country.name}</li>
          ))
        )}
      </ul>
    </>
  );
};

export default CountriesList;
