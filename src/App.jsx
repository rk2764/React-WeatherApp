import { FaSearch } from "react-icons/fa";
import "./App.css";
import { useEffect, useState } from "react";
import WeatherDetails from "./WeatherDetails.jsx";
import Footer from "./Footer.jsx";

import clearsky from "./assets/clear-sky.png";
import cloud from "./assets/cloud.png";
import rain from "./assets/rain.png";
import snows from "./assets/snowy.png";

const App = () => {
  const API_KEY = `7ea45190cbaf6740ab3bcc65a8113115`;

  const [weatherIcon, setWeatherIcon] = useState(clearsky);
  const [temp, setTemp] = useState(25);
  const [cityName, setCityName] = useState("Chennai");
  const [countryCode, setCountryCode] = useState("IN");
  const [latitude, setLatitude] = useState(1.1);
  const [longitude, setLongitude] = useState(2.2);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);

  const [cityNotFound, setCityNotFound] = useState(false);
  const [loadingCity, setLoadingCity] = useState(false);
  const [error, setError] = useState(null);

  const weatherIconDisplay = {
    "01d": clearsky,
    "01n": clearsky,
    "02d": cloud,
    "02n": cloud,
    "03d": rain,
    "03n": rain,
    "04d": cloud,
    "04n": cloud,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snows,
    "13n": snows,
  };

  const handleApiCall = async () => {
    setLoadingCity(true);
    setError(null);
    setCityNotFound(false);

    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.cod === "404") {
        setCityNotFound(true);
        return;
      }

      setTemp(Math.round(data.main.temp));
      setCountryCode(data.sys.country);
      setLatitude(data.coord.lat);
      setLongitude(data.coord.lon);
      setHumidity(data.main.humidity);
      setWind((data.wind.speed * 3.6).toFixed(1));

      const iconCode = data.weather[0].icon;
      setWeatherIcon(weatherIconDisplay[iconCode] || clearsky);
    } catch (err) {
      console.log("An Error occurred", err.message);
      setError("An error occurred while fetching weather data.");
    } finally {
      setLoadingCity(false);
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") handleApiCall();
  };

  useEffect(() => {
    handleApiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      {/* 🔹 Project Header */}

      {/* Search Bar */}
      <div className="input-container">
        <input
          type="text"
          className="cityInput"
          placeholder="Enter city..."
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
          onKeyDown={handleSearch}
        />
        <div className="search-icon">
          <FaSearch
            size={24}
            role="button"
            tabIndex={0}
            onClick={handleApiCall}
          />
        </div>
      </div>

      {/* Loading State */}
      {loadingCity && <div className="loading-message">Loading...</div>}

      {/* Error State */}
      {error && <div className="error-message">{error}</div>}

      {/* City Not Found */}
      {cityNotFound && <div className="city-not-found">City Not Found</div>}

      {/* Weather Details */}
      {!loadingCity && !cityNotFound && !error && (
        <WeatherDetails
          icons={weatherIcon}
          temperature={temp}
          cityName={cityName}
          country={countryCode}
          latitude={latitude}
          longitude={longitude}
          humidity={humidity}
          wind={wind}
        />
      )}

      <Footer />
    </div>
  );
};

export default App;
