import React, { useState, useEffect } from "react";
import { SearchArea } from "./components/SearchArea";
import { getWeather } from "./components/getWeather";
import { format, addMinutes, addSeconds } from "date-fns";
import ReactCountryFlag from "react-country-flag";

const App = () => {
  const [cityText, setCityText] = useState("");

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

  const iconUrl = `http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;

  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  return (
    <div>
      <p>
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

      <p>{weatherData.date}</p>
      <p>{weatherData.time}</p>
      <p>{weatherData.temperature}</p>
      <p>
        {weatherData.weather}
        <img src={iconUrl} />
      </p>

      <SearchArea
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
