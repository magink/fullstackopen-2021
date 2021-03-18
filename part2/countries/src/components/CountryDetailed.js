import React from "react";
import Weather from "./Weather";

const CountryDetailed = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.capital}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.iso639_1}>{lang.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={`Flag of ${country.name}`} width="200px" />
      <Weather capital={country.capital} />
    </div>
  );
};

export default CountryDetailed;
