import React, { useState, useEffect } from "react";
import { SearchArea } from "./components/SearchArea";
import { getWeather } from "./components/getWeather";
import { format, addMinutes, addSeconds } from "date-fns";
import ReactCountryFlag from "react-country-flag";
import "./App.css";

const App = () => {
  const [cityText, setCityText] = useState("");

  const [weatherData, setWeatherData] = useState({
    cityName: "",
    countryCode: "",
    date: "",
    time: "",
    temperature: "",
    weather: "",
    weatherMain: "",
    icon: "",
  });

  const weatherDataFnc = (res) => {
    const date = new Date();
    const utcTime = addMinutes(date, date.getTimezoneOffset());

    setWeatherData({
      cityName: res.name,
      countryCode: res.sys.country,
      date: format(addSeconds(utcTime, res.timezone), "EEEE, LLL d"),
      time: format(addSeconds(utcTime, res.timezone), "h:mm a"),
      weather: res.weather[0].description,
      weatherMain: res.weather.main,
      icon: res.weather[0].icon,
      temperature: `${res.main.temp.toFixed(0)}°`,
    });
  };

  useEffect(() => {
    cityText && getWeather(cityText).then(weatherDataFnc);
  }, [cityText]);

  useEffect(() => {
    getWeather("denver").then(weatherDataFnc);
  }, []);

  const iconUrl = `http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;

  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  return (
    <div className="App">
      <div className="box">
        <p style={{ fontSize: "30px" }}>
          {weatherData.cityName}, {regionNames.of(weatherData.countryCode)}{" "}
          <ReactCountryFlag
            countryCode={weatherData.countryCode}
            svg
            style={{
              width: "2em",
              height: "2em",
            }}
            title={weatherData.countryCode}
          />
        </p>
        <p style={{ fontSize: "25px" }}>{weatherData.date}</p>
        <p style={{ fontSize: "25px" }}>{weatherData.time}</p>
        <p className="tem">{weatherData.temperature}</p>
        <p className="weatherIcon" style={{ fontSize: "25px" }}>
          {weatherData.weather}
          <img src={iconUrl} />
        </p>
      </div>
      <SearchArea
        className="search"
        value={cityText}
        onSubmit={(text) => {
          console.log(text);
          setCityText(text);
        }}
      />
    </div>
  );
};

export default App;
