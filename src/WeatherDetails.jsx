import React from "react";
import "./App.css";
import windSpeed from "./assets/windSpeed.png";

const WeatherDetails = ({
  icons,
  temperature,
  cityName,
  country,
  latitude,
  longitude,
  humidity,
  wind,
}) => {
  return (
    <div className="weather-card">
      {/* Weather Image */}
      <div className="image">
        <img src={icons} alt="Weather Icon" />
      </div>

      {/* Temperature & Location */}
      <div className="temp">{temperature}°C</div>
      <div className="location">{cityName}</div>
      <div className="country">{country}</div>

      {/* Coordinates */}
      <div className="cord">
        <div>
          <span className="lat">Latitude: </span>
          <span>{latitude}</span>
        </div>
        <div>
          <span className="log">Longitude: </span>
          <span>{longitude}</span>
        </div>
      </div>

      {/* Extra Weather Data */}
      <div className="data-container">
        {/* Humidity */}
        <div className="element">
          <img
            src="https://cdn-icons-png.flaticon.com/512/728/728093.png"
            alt="Humidity Icon"
            className="icon"
          />
          <div className="data">
            <div className="humidity-percentage">{humidity}%</div>
            <div className="humidity">Humidity</div>
          </div>
        </div>

        {/* Wind */}
        <div className="element">
          <img
            src={windSpeed}
            alt="Wind Icon"
            className="icon"
          />
          <div className="data">
            <div className="wind-percentage">{wind} km/h</div>
            <div className="wind">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
