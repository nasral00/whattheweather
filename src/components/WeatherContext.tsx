import React, { useState, createContext, useEffect } from "react";

export const WeatherContext = createContext({
  weatherInfo: { city: "", temp: "", forecast: "" },
  setWeatherInfo: {},
  fetchWeather: (city: string, country: string, e: any) => {},
});

// const WeatherUpdateContext = createContext(
//   (city: string, country: string) => {}
// );

// export function useWeatherContext() {
//   return useContext(WeatherContext);
// }
// export function useWeatherUpdateContext() {
//   return useContext(WeatherUpdateContext);
// }

export function WeatherProvider(props: any) {
  const API_KEY = "7a420dd1ec3fe96ed02a07ec09aad34e";
  const URL = `http://api.openweathermap.org/data/2.5/weather?q=`;
  const GEOLOCATION_URL = `http://api.openweathermap.org/data/2.5/weather?`;
  const [weatherInfo, setWeatherInfo] = useState({
    city: "",
    temp: "",
    forecast: "",
  });
  // const [geoLocationWeather, setGeoLocationWeather] = useState({
  //   geoLocationCity: "",
  //   geoLocationTemp: "",
  //   geoLocationForecast: "",
  // });
  // navigator.geolocation.getCurrentPosition((p) => {
  //   console.log(p);
  // });
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
