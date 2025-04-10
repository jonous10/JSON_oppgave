"use client";

import { useEffect, useState } from "react";

export default function Weather() {
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<string>("60.86");
  const [longitude, setLongitude] = useState<string>("11.55");
  const [isCelsius, setIsCelsius] = useState(true);

  // Fetch weather data
  const fetchWeather = async (lat: string, lon: string) => {
    try {
      const response = await fetch(
        `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const data = await response.json();
      setWeather(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Fetch weather on component mount
  useEffect(() => {
    fetchWeather(latitude, longitude);
  }, []);

  // Format weather condition
  const formatCondition = (condition: string) =>
    condition
      ?.replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()) || "N/A";

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setLatitude(coords.latitude.toString());
        setLongitude(coords.longitude.toString());
        fetchWeather(coords.latitude.toString(), coords.longitude.toString());
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(latitude, longitude);
  };

  // Loading and error states
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!weather)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );

  // Extract current and hourly weather data
  const current = weather.properties.timeseries[0];
  const hourlyForecast = weather.properties.timeseries.slice(0, 5);

  const currentTemperature = current.data.instant.details.air_temperature;
  const currentCondition = current.data.next_1_hours?.summary.symbol_code || "clear";
  const backgroundClass = currentCondition.includes("rain")
    ? "bg-blue-500 text-white"
    : currentCondition.includes("cloud")
    ? "bg-gray-300 text-black"
    : "bg-yellow-300 text-black";

  return (
    <div className={`p-4 min-h-screen ${backgroundClass}`}>
      {/* Current Weather */}
      <div className="mb-6 p-4 border rounded bg-white shadow">
        <h2 className="text-xl font-bold">Current Weather</h2>
        <div className="flex items-center gap-4">
          <img
            src={`/icons/${currentCondition}.png`}
            alt={currentCondition}
            className="w-16 h-16"
            onError={(e) => (e.currentTarget.src = "/icons/default.png")}
          />
          <div>
            <p>
              <strong>Temperature:</strong>{" "}
              {isCelsius
                ? `${currentTemperature}°C`
                : `${((currentTemperature * 9) / 5 + 32).toFixed(1)}°F`}
            </p>
            <p>
              <strong>Condition:</strong> {formatCondition(currentCondition)}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsCelsius(!isCelsius)}
          className="p-2 bg-gray-500 text-white rounded mt-2"
        >
          Toggle to {isCelsius ? "Fahrenheit" : "Celsius"}
        </button>
      </div>

      {/* Location Form */}
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

      <button
        onClick={getCurrentLocation}
        className="p-2 bg-green-500 text-white rounded mb-4"
      >
        Use Current Location
      </button>

      {/* Hourly Forecast */}
      <h2 className="text-xl font-bold mt-4">Hourly Forecast</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hourlyForecast.map((hour, index) => {
          const time = new Date(hour.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          const condition = hour.data.next_1_hours?.summary.symbol_code || "N/A";
          const temperature = hour.data.instant.details.air_temperature;
          const windSpeed = hour.data.instant.details.wind_speed;
          const windDirection = hour.data.instant.details.wind_from_direction;
          const precipitation =
            hour.data.next_1_hours?.details.precipitation_amount || 0;

          return (
            <li key={index} className="p-4 border rounded shadow bg-black">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={`/icons/${condition}.png`}
                  alt={condition}
                  className="w-8 h-8"
                  onError={(e) => (e.currentTarget.src = "/icons/default.png")}
                />
                <p className="text-lg font-bold">{time}</p>
              </div>
              <p>
                <strong>Condition:</strong> {formatCondition(condition)}
              </p>
              <p>
                <strong>Temperature:</strong> {temperature}°C
              </p>
              <p>
                <strong>Wind:</strong> {windSpeed} m/s, {windDirection}°
              </p>
              <p>
                <strong>Precipitation:</strong> {precipitation} mm
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}