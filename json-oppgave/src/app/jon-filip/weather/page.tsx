"use client";

import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import { useState } from "react";

async function fetchDATA(lat: number, lon: number) {
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;
    const headers = {
        method: 'GET',
    };

    try {
        const response = await fetch(url, headers);

        let weatherData = await response.json();

        return weatherData;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export default function Home() {
    const [lat, setLat] = useState<number>(0);
    const [lon, setLon] = useState<number>(0);
    const [weatherData, setWeatherData] = useState<any>(null);

    const handleFetchWeather = async () => {
        const data = await fetchDATA(lat, lon);
        setWeatherData(data);
    };

    return (
        <div>
            <Header />
            <div className="m-4 justify-center flex">
                <Input
                    type="number"
                    className="w-60 m-2"
                    placeholder="Latitude"
                    onChange={(e) => setLat(parseFloat(e.target.value))}
                />
                <Input
                    type="number"
                    className="w-60 m-2"
                    placeholder="Longitude"
                    onChange={(e) => setLon(parseFloat(e.target.value))}
                />
                <Button
                    className="m-2"
                    onClick={handleFetchWeather}
                >
                    Get Weather
                </Button>
            </div>
            <p>{lat} {lon}</p>
            <p>{weatherData ? JSON.stringify(weatherData, null, 2) : "No data fetched yet"}</p>
        </div>
    );
}