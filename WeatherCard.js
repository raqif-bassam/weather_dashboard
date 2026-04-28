import React from "react";
import { categorizeTemperature } from "./utils";

export default function WeatherCard({ city, unit }) {
  const { name, weather } = city;

  if (!weather) return null;

  const tempCategory = unit === "metric"
    ? categorizeTemperature(weather.temp)
    : categorizeTemperature((weather.temp - 32) * (5 / 9));

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <p>{weather.description}</p>
      <p>
        🌡️ Temp: {weather.temp}° {unit === "metric" ? "C" : "F"} ({tempCategory})
      </p>
      <p>💧 Humidity: {weather.humidity}%</p>
      <p>🌬️ Wind: {weather.windSpeed} m/s</p>
    </div>
  );
}
