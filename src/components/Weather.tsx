/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useContext, useRef } from "react";
import { WeatherContext } from "./WeatherContext";
import "./Weather.scss";
import sun from "../images/sunny.svg";
import showers from "../images/showers.svg";
import overcast from "../images/overcast.svg";
import mist from "../images/mist.svg";

function Weather() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const weatherInfo = useContext(WeatherContext);

  return (
    <div className="weather">
      <div className="container">
        <div className="img">
          {/* <p>{weatherInfo.weatherInfo.forecast}</p> */}
          {weatherInfo.weatherInfo.forecast.includes("clouds") && (
            <img src={overcast} alt="overcast" />
          )}
          {weatherInfo.weatherInfo.forecast === "mist" && (
            <img src={mist} alt="overcast" />
          )}
          {weatherInfo.weatherInfo.forecast.includes("rain") && (
            <img src={showers} alt="overcast" />
          )}
          {weatherInfo.weatherInfo.forecast.includes("sun") ||
            (weatherInfo.weatherInfo.forecast.includes("clear sky") && (
              <img src={sun} alt="sunny" />
            ))}
          {/* <img src={sun} alt="sunny" width="150" height="150" /> */}
        </div>
        <div className="inner__container">
          <div className="metadata">
            <h1>{weatherInfo.weatherInfo.city}</h1>
            <p>{weatherInfo.weatherInfo.forecast.toUpperCase()}</p>
          </div>
          {weatherInfo.weatherInfo.temp && (
            <p className="weather__info">
              {convertToFahrenheit(+weatherInfo.weatherInfo.temp).toFixed(0)}
              <span>&#176;</span> F
            </p>
          )}

          <div className="searchbox">
            <div className="city">
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                defaultValue=""
                placeholder="City"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </div>
            <div className="country">
              <input
                type="text"
                id="country"
                name="country"
                value={country}
                defaultValue=""
                placeholder="Country Code"
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              onClick={(e) => {
                weatherInfo.fetchWeather(
                  city.toLowerCase(),
                  country.toLowerCase(),
                  e
                );
                setCity("");
                setCountry("");
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;

function convertToFahrenheit(deg: number) {
  let fahrenheit = (deg * 9) / 5 - 459.67;
  return fahrenheit;
}
