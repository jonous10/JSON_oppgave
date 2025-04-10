// MapPicker.tsx
"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";

interface MapPickerProps {
    onLocationSelected: (lat: number, lon: number) => void; // Function to handle lat/lon selection
}

const MapPicker = ({ onLocationSelected }: MapPickerProps) => {
    const [position, setPosition] = useState<[number, number]>([0, 0]); // Default position (0, 0)

    // This hook listens for map clicks and updates position
    function MapClickHandler() {
        useMapEvent("click", (event) => {
            const { lat, lng } = event.latlng;
            setPosition([lat, lng]);
            onLocationSelected(lat, lng);  // Pass lat and lng to the parent component
        });
        return null;
    }

    return (
        <MapContainer center={[0, 0]} zoom={2} style={{ width: "100%", height: "400px" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapClickHandler />
            <Marker position={position}>
                <Popup>
                    Latitude: {position[0]} <br /> Longitude: {position[1]}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapPicker;