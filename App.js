import React, { useState } from "react";
import { createId, fetchWeatherByCoords } from "./utils";
import WeatherCard from "./WeatherCard";

const cityOptions = {
  london: { name: "London", lat: 51.5074, lon: -0.1278 },
  paris: { name: "Paris", lat: 48.8566, lon: 2.3522 },
  tokyo: { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
  newyork: { name: "New York", lat: 40.7128, lon: -74.006 },
  sydney: { name: "Sydney", lat: -33.8688, lon: 151.2093 },
};

export default function App() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [unit, setUnit] = useState("metric");

  const addCity = async () => {
    if (!selectedCity) return;

    const { name, lat, lon } = cityOptions[selectedCity];
    const weather = await fetchWeatherByCoords(lat, lon, unit);

    const city = {
      id: createId(),
      name,
      lat,
      lon,
      weather,
    };

    if (!cities.find((c) => c.name === name)) {
      setCities([...cities, city]);
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
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">Select a city</option>
          {Object.entries(cityOptions).map(([key, { name }]) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </select>
        <button onClick={addCity}>Add City</button>
        <button onClick={toggleUnit}>Toggle °C/°F</button>
      </div>

      <div className="cards-container">
        {cities.map((city) => (
          <WeatherCard key={city.id} city={city} unit={unit} />
        ))}
      </div>
    </div>
  );
}
