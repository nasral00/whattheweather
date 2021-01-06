import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Weather from "./components/Weather";
import { WeatherProvider } from "./components/WeatherContext";

function App() {
  return (
    <WeatherProvider>
      <div className="App">
        <Header />
        <Weather />
        <Footer />
      </div>
    </WeatherProvider>
  );
}

export default App;
