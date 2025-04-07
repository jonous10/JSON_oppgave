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
                    <TableCell>Air Temperature</TableCell>
                    <TableCell>Air Temperature</TableCell>
                </TableRow>
                {weatherData?.properties?.timeseries?.map((t: any, index: number) => {
                    return (
                        <TableRow key={index}>
                            <TableCell>{t?.time}</TableCell>
                            <TableCell>{t?.data?.instant?.details?.air_temperature} {}</TableCell>
                            <TableCell>{t?.data?.instant?.details?.wind_from_direction} {}</TableCell>
                            <TableCell>{t?.data?.instant?.details?.wind_speed} {}</TableCell>
                            <TableCell>{t?.data?.instant?.details?.wind_from_direction} {}</TableCell>
                            <TableCell>{t?.data?.instant?.details?.wind_from_direction} {}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
