import React from "react";

export default function WeatherCard({ city, unit }) {
  const { name, weather } = city;

  if (!weather) return null;

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <p>{weather.description}</p>
      <p>
        🌡️ Temp: {weather.temp}° {unit === "metric" ? "C" : "F"}
      </p>
      <p>💧 Humidity: {weather.humidity}%</p>
      <p>🌬️ Wind: {weather.windSpeed} m/s</p>
    </div>
  );
}
