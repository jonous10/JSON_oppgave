"use client";

import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import MapPicker from "@/components/ui/map";
import WeatherTable from "@/components/ui/weather-table";
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
        return error;
    }
}

export default function Home() {
    const [weatherData, setWeatherData] = useState<JSON>()

    return (
        <div>
            <Header />
            <div className="h-96">
                <MapPicker onLocationSelected={(lat: number, lon: number) => {fetchDATA(lat, lon).then((res: any) => {
                    setWeatherData(res)
                })}}/>
            </div>
            <div className="m-4 justify-center flex">
                <WeatherTable weatherData={weatherData}/>
            </div>
        </div>
    );
}