import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    axios.defaults.baseURL = "http://api.openweathermap.org"; // Defaults to localhost if not set
    axios
      .get(
        `/data/2.5/weather?q=${capital}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [capital]);
  if (!weather) {
    return <div>No Weather info available</div>;
  } else {
    return (
      <div>
        <h1>Weather in {capital}</h1>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          alt={`Weather icon for ${weather.weather[0].description}`}
        />
        <p>
          {capital} is experiencing {weather.weather[0].description}
        </p>
        <p>Temp: {weather.main.temp} °C</p>
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    );
  }
};
export default Weather;
