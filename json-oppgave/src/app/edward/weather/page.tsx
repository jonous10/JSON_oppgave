"use client";

import { useEffect, useState } from "react";

export default function Weather() {
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<string>("60.86");
  const [longitude, setLongitude] = useState<string>("11.55");

  const fetchWeather = (lat: string, lon: string) => {
    setError(null); // Reset error state
    setWeather(null); // Reset weather state
    fetch(
      `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        return response.json();
      })
      .then((data) => {
        setWeather(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  useEffect(() => {
    // Fetch weather data for the default coordinates
    fetchWeather(latitude, longitude);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchWeather(latitude, longitude); // Fetch weather for the entered coordinates
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weather) {
    return <div>Loading...</div>;
  }

  // Extract relevant weather data
  const temperature =
    weather.properties.timeseries[0].data.instant.details.air_temperature;
  const windSpeed =
    weather.properties.timeseries[0].data.instant.details.wind_speed;

  return (
    <div className="p-4 border rounded">
      <h1 className="text-2xl font-bold">Current Weather</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Latitude"
            className="p-2 border rounded"
          />
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Longitude"
            className="p-2 border rounded"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Get Weather
          </button>
        </div>
      </form>
      <p>Temperature: {temperature}°C</p>
      <p>Wind Speed: {windSpeed} m/s</p>
    </div>
  );
}