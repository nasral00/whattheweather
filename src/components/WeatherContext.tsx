import React, { useState, createContext, useEffect } from "react";

//Using react context api to host state for all components

// weather context that is specified in Provider below, have to provide default values for TS
export const WeatherContext = createContext({
  weatherInfo: { city: "", temp: "", forecast: "" },
  setWeatherInfo: {},
  fetchWeather: (city: string, country: string, e: any) => {},
});

// Weather Provider
export function WeatherProvider(props: any) {
  // const API_KEY = ""; add openweather map api key here
  const URL = `http://api.openweathermap.org/data/2.5/weather?q=`;
  const GEOLOCATION_URL = `http://api.openweathermap.org/data/2.5/weather?`;
  const [weatherInfo, setWeatherInfo] = useState({
    city: "",
    temp: "",
    forecast: "",
  });

  //pulls location on first load
  useEffect(() => {
    if (navigator.geolocation) {
      let geoLocationPosition = navigator.geolocation.getCurrentPosition.bind(
        navigator.geolocation
      );
      let geoLocationPositionAsync = () => new Promise(geoLocationPosition);
      let getGeoLocationData = async () => {
        const position = await geoLocationPositionAsync();
        console.log("p", position);
        return [position.coords.latitude, position.coords.longitude];
      };
      getGeoLocationData()
        .then((p) => {
          return p;
        })
        .then((geoPositions) => {
          fetch(
            `${GEOLOCATION_URL}lat=${geoPositions[0]}&lon=${geoPositions[1]}&appid=${API_KEY}`
          )
            .then((res) => res.json())
            .then((data) => {
              setWeatherInfo({
                city: data.name,
                temp: data.main.temp,
                forecast: data.weather[0].description,
              });
            });
        });
    }
  }, []);

  //fetches the weather for specified
  const fetchWeather = (city: string, country: string, event: any) => {
    event.preventDefault();
    fetch(`${URL}${city},${country}&appid=${API_KEY}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .then((weather) => {
        let weatherName = weather.name.toString();
        let weatherTemp = weather.main.temp.toString();
        let weatherForecast = weather.weather[0].description.toString();
        console.log(weatherName);
        console.log(weatherForecast);
        console.log(weatherTemp);
        setWeatherInfo({
          city: weatherName,
          temp: weatherTemp,
          forecast: weatherForecast,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <WeatherContext.Provider
      value={{ weatherInfo, setWeatherInfo, fetchWeather }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
}
