import React, { useContext } from "react";
import "./Header.scss";
import { WeatherContext } from "./WeatherContext";

function Header() {
  const location = useContext(WeatherContext);

  return (
    <div className="header">
      <div className="logo">
        <h1>WHAT THE WEATHER</h1>
      </div>
      {/* <div>
        <h1>{location.weatherInfo.city}</h1>
      </div> */}
    </div>
  );
}

export default Header;
