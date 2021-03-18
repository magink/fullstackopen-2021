import React from "react";

const CountriesList = ({ countries, handleClick }) => {
  return (
    <>
      <ul>
        {countries.length > 10 ? (
          <li>Too many matches, specify another filter</li>
        ) : (
          countries.map((country) => (
            <li key={country.numericCode}>
              {country.name}
              <button onClick={() => handleClick(country.name)}>Show</button>
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default CountriesList;
