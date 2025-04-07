"use client";

import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";

async function fetchDATA(lat: number, lon: number) {
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;
    const headers = {
        method: 'GET',
    };
    

    try {
        const response = await fetch(url, headers);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

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
    const [readableData, setReadableData] = useState<Object>({});

    const handleFetchWeather = async () => {
        const data = await fetchDATA(lat, lon);
        setWeatherData(data);
    };

    useEffect(() => {
        if (!weatherData) return;
    
        try {
            setReadableData({
                units: {
                    air_pressure_at_sea_level: weatherData.properties.meta.units.air_pressure_at_sea_level,
                    air_temperature: weatherData.properties.meta.units.air_temperature,
                    cloud_area_fraction: weatherData.properties.meta.units.cloud_area_fraction,
                    precipitation_amount: weatherData.properties.meta.units.precipitation_amount,
                    relative_humidity: weatherData.properties.meta.units.relative_humidity,
                    wind_from_direction: weatherData.properties.meta.units.wind_from_direction,
                    wind_speed: weatherData.properties.meta.units.wind_speed,
                },
                recentWeather: {
                    air_pressure_at_sea_level: weatherData.properties.timeseries[0].data.instant.details.air_pressure_at_sea_level,
                    air_temperature: weatherData.properties.timeseries[0].data.instant.details.air_temperature,
                    cloud_area_fraction: weatherData.properties.timeseries[0].data.instant.details.cloud_area_fraction,
                    relative_humidity: weatherData.properties.timeseries[0].data.instant.details.relative_humidity,
                    wind_from_direction: weatherData.properties.timeseries[0].data.instant.details.wind_from_direction,
                    wind_speed: weatherData.properties.timeseries[0].data.instant.details.wind_speed,
                },
            });
        } catch (error) {
            console.log("Error setting readableData:", error);
        }
    }, [weatherData]);

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
            {weatherData?.properties?.timeseries?.map((weather: any, index: number) => {
                if (!weather) return;
                return (
                    <div key={index} className="p-10">
                        <p>{JSON.stringify(weather)}</p>
                        <Separator className="m-2"/>
                    </div>
                )
            })}
        </div>
    );
}