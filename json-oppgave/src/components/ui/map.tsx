"use client";

import { useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvent,
} from "react-leaflet";
import L from "leaflet";

// Define custom icon
const customIcon = L.icon({
    iconUrl: "https://th.bing.com/th/id/R.98930f0bb073c0fa078eecf278c1b858?rik=whWj9pMmb1jM%2bg&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f2017%2f05%2fMap-Marker-PNG-HD.png&ehk=yVIDQps8Wvb7YRJMcSSZC1C2v0hbRFNsAi4q9%2fn%2fmdY%3d&risl=&pid=ImgRaw&r=0", // Local image in /public folder
    iconSize: [25, 41], // Width, height in pixels
    iconAnchor: [12, 41], // Where the "point" of the icon is
    popupAnchor: [0, -41], // Where the popup opens relative to iconAnchor
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
});

interface MapPickerProps {
    onLocationSelected: (lat: number, lon: number) => void;
}

const MapPicker = ({ onLocationSelected }: MapPickerProps) => {
    const [position, setPosition] = useState<[number, number]>([0, 0]);

    function MapClickHandler() {
        useMapEvent("click", (event) => {
            const { lat, lng } = event.latlng;
            setPosition([lat, lng]);
            onLocationSelected(lat, lng);
        });
        return null;
    }

    return (
        <MapContainer center={[0, 0]} zoom={2} style={{ width: "100%", height: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapClickHandler />
            <Marker position={position} icon={customIcon}>
                <Popup>
                    Latitude: {position[0]} <br /> Longitude: {position[1]}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapPicker;
