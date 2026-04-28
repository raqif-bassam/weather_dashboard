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



/**
 * Create a new function that takes a city name and returns its latitude and longitude using the OpenWeather’s Geocoding API.
 * Also, write a function that categorizes temperature into labels such as "Cold", "Mild", or "Hot" based on temperature in Celsius.
 * Export both functions so they can be used in other files.
 */

export async function fetchCoordsByCity(city) {
  const apiKey = "demo"; // Replace with your OpenWeather API key
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.length === 0) {
    throw new Error("City not found");
  }

  const { lat, lon } = data[0];
  return { lat, lon };
}

export function categorizeTemperature(tempCelsius) {
  if (tempCelsius < 10) return "Cold";
  if (tempCelsius < 25) return "Mild";
  return "Hot";
}

