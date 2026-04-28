import React, { useState } from "react";
import { createId, fetchCoordsByCity, fetchWeatherByCoords } from "./utils";
import WeatherCard from "./WeatherCard";

export default function App() {
  const [cities, setCities] = useState([]);
  const [cityInput, setCityInput] = useState("");
  const [unit, setUnit] = useState("metric");
  const [error, setError] = useState("");

  const addCity = async () => {
    const cityName = cityInput.trim();
    if (!cityName) return;

    setError("");
    try {
      const { lat, lon } = await fetchCoordsByCity(cityName);
      const weather = await fetchWeatherByCoords(lat, lon, unit);

      const city = {
        id: createId(),
        name: cityName,
        lat,
        lon,
        weather,
      };

      if (!cities.find((c) => c.name.toLowerCase() === cityName.toLowerCase())) {
        setCities([...cities, city]);
      }
      setCityInput("");
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleUnit = () => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);
    cities.forEach(async (city) => {
      const updatedWeather = await fetchWeatherByCoords(city.lat, city.lon, newUnit);
      setCities((prev) =>
        prev.map((c) => (c.id === city.id ? { ...c, weather: updatedWeather } : c))
      );
    });
  };

  return (
    <div className="app-container">
      <h1>🌤️ Weather Dashboard</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter city name"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addCity()}
        />
        <button onClick={addCity}>Add City</button>
        <button onClick={toggleUnit}>Toggle °C/°F</button>
      </div>
      {error && <p className="error">{error}</p>}

      <div className="cards-container">
        {cities.map((city) => (
          <WeatherCard key={city.id} city={city} unit={unit} />
        ))}
      </div>
    </div>
  );
}
