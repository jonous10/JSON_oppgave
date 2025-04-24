"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "./table"

interface WeatherProps {
    weatherData: any 
}

export default function WeatherTable({ weatherData }: WeatherProps) {
    const [storedData, setStoredData] = useState(null);

    useEffect(() => {
        // Only runs on client
        const dataFromStorage = localStorage.getItem("someKey");
        if (dataFromStorage) {
            setStoredData(JSON.parse(dataFromStorage));
        }
    }, []);

    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>Time Measured</TableCell>
                    <TableCell>Air Temperature</TableCell>
                    <TableCell>Wind Direction</TableCell>
                    <TableCell>Wind Speed</TableCell>
                    <TableCell>Air Pressure (at sea)</TableCell>
                    <TableCell>Cloud Area Fraction</TableCell>
                    <TableCell>Relative Humidity</TableCell>
                </TableRow>
                {weatherData?.properties?.timeseries?.map((t: any, index: number) => {
                    return (
                        <TableRow key={index}>
                            <TableCell>{t?.time}</TableCell>
                            <TableCell>{t?.data?.instant?.details?.air_temperature} {weatherData.properties.meta.units.air_temperature}</TableCell>
                            <TableCell>{t?.data?.instant?.details?.wind_from_direction} {weatherData.properties.meta.units.wind_from_direction}</TableCell>
                            <TableCell>{t?.data?.instant?.details?.wind_speed} {weatherData.properties.meta.units.wind_speed}</TableCell>
                            <TableCell>{t?.data?.instant?.details?.air_pressure_at_sea_level} {weatherData.properties.meta.units.air_pressure_at_sea_level}</TableCell>
                            <TableCell>{t?.data?.instant?.details?.cloud_area_fraction} {weatherData.properties.meta.units.cloud_area_fraction}</TableCell>
                            <TableCell>{t?.data?.instant?.details?.relative_humidity} {weatherData.properties.meta.units.relative_humidity}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
