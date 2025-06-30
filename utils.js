export function createId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export async function fetchWeatherByCoords(lat, lon, unit = "metric") {
  const apiKey = "demo"; // Replace with your OpenWeather API key
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  const res = await fetch(url);
  const data = await res.json();

  const temp = data.current_weather.temperature;
  const windSpeed = data.current_weather.windspeed;
  const description = "Clear or cloudy"; // Simplified

  return {
    temp,
    humidity: 60, // demo fallback
    windSpeed,
    description,
  };
}
