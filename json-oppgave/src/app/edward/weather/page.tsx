"use client";

import { useEffect, useState } from "react";

export default function Weather() {
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch weather data
    fetch(
      "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60.86&lon=11.55"
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
  }, []);

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
      <p>Temperature: {temperature}°C</p>
      <p>Wind Speed: {windSpeed} m/s</p>
    </div>
  );
}