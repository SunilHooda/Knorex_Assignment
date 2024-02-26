import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

function App() {
  const [city, setCity] = useState("Ho Chi Minh");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const fetchingData = (url, setMethod) => {
    axios
      .get(url)
      .then((res) => {
        //console.log(res);
        setMethod(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchingData(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1ddbb67ac01f70e185ad78b63ed7a329&units=metric`,
      setCurrentWeather
    );
    fetchingData(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=1ddbb67ac01f70e185ad78b63ed7a329&units=metric`,
      setForecastWeather
    );
  }, [city]);

  // console.log("currentWeather", currentWeather);
  // console.log("forecastWeather", forecastWeather);

  return (
    <div className={styles.container}>
      <div>
        <h2>From :</h2>
        <select className={styles.select} onChange={handleChange}>
          <option value="Ho Chi Minh">Ho Chi Minh</option>
          <option value="Singapore">Singapore</option>
          <option value="Kuala Lumpur">Kuala Lumpur</option>
          <option value="Tokyo">Tokyo</option>
          <option value="Athens">Athens</option>
        </select>
      </div>

      <div className={styles.weatherContainer}>
        <div>
          {currentWeather && (
            <div>
              <h2>Current Weather</h2>
              <div>
                <p>{currentWeather.main.temp} °C</p>
                <img
                  src={`https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`}
                  alt=""
                />
              </div>
            </div>
          )}
        </div>

        <div>
          {forecastWeather && (
            <div className={styles.forecast}>
              <h2>Next 3 Days Forecast</h2>
              {forecastWeather.list.slice(0, 3).map((forecast, index) => (
                <div key={index} className="forecast-item">
                  <p>Date: {forecast.dt_txt.split(" ")[0]}</p>
                  <p>Temperature: {forecast.main.temp} °C</p>
                  <img
                    src={`https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                    alt=""
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
