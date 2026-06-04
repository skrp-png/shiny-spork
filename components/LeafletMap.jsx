"use client";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix for default marker icons in Leaflet + Next.js
const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Create custom icons for different categories
const createCustomIcon = (color, isSelected = false, emoji = "📍") => {
    const size = isSelected ? 40 : 30;
    return new L.DivIcon({
        html: `
            <div class="${isSelected ? 'animate-bounce' : ''}" style="
                background-color: ${color};
                width: ${size}px;
                height: ${size}px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                display: flex;
                align-items: center;
                justify-content: center;
                border: ${isSelected ? '3px' : '2px'} solid white;
                box-shadow: 0 4px 10px rgba(0,0,0,0.4);
            ">
                <div style="
                    font-size: ${isSelected ? '18px' : '15px'};
                    transform: rotate(45deg);
                ">${emoji}</div>
            </div>
        `,
        className: "",
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        popupAnchor: [0, -size]
    });
};

const icons = {
    Monumenti: createCustomIcon("#E76F51", false, "🏰"),
    Chiese: createCustomIcon("#264653", false, "⛪"),
    Parchi: createCustomIcon("#2A9D8F", false, "🌳"),
    Panorami: createCustomIcon("#E9C46A", false, "🔭"),
    Ristorazione: createCustomIcon("#e63946", false, "🍽️"),
    Alloggi: createCustomIcon("#457b9d", false, "🏨"),
    Servizi: createCustomIcon("#a8dadc", false, "🔧"),
    Default: createCustomIcon("#2A9D8F", false, "📍")
};

const selectedIcons = {
    Monumenti: createCustomIcon("#E76F51", true, "🏰"),
    Chiese: createCustomIcon("#264653", true, "⛪"),
    Parchi: createCustomIcon("#2A9D8F", true, "🌳"),
    Panorami: createCustomIcon("#E9C46A", true, "🔭"),
    Ristorazione: createCustomIcon("#e63946", true, "🍽️"),
    Alloggi: createCustomIcon("#457b9d", true, "🏨"),
    Servizi: createCustomIcon("#a8dadc", true, "🔧"),
    Default: createCustomIcon("#2A9D8F", true, "📍")
};

// Component to handle map centering when a POI is selected
function ChangeView({ selectedPoint }) {
    const map = useMap();
    useEffect(() => {
        if (selectedPoint) {
            const center = [selectedPoint.coordinates.lat, selectedPoint.coordinates.lng];
            const zoom = 18;
            map.setView(center, zoom, { animate: true });
        }
    }, [selectedPoint, map]);
    return null;
}

// Component to handle mobile gesture/dragging behavior
function MapBehaviorController({ isFullscreen }) {
    const map = useMap();
    useEffect(() => {
        if (typeof window === "undefined") return;
        const isMobile = window.innerWidth < 768;
        if (isMobile && !isFullscreen) {
            map.dragging.disable();
            if (map.tap) map.tap.disable();
        } else {
            map.dragging.enable();
            if (map.tap) map.tap.enable();
        }
    }, [isFullscreen, map]);
    return null;
}

export default function LeafletMap({ points, selectedPoint, onPointClick, isFullscreen = false }) {
    const defaultCenter = [40.8995, 15.4380]; // Better Calitri Center
    const defaultZoom = 16;

    return (
        <div className="h-full w-full rounded-2xl overflow-hidden border border-stone-200 shadow-inner">
            <MapContainer
                center={defaultCenter}
                zoom={defaultZoom}
                scrollWheelZoom={false}
                className="h-full w-full z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                <ChangeView selectedPoint={selectedPoint} />
                <MapBehaviorController isFullscreen={isFullscreen} />

                {points.map((poi) => {
                    const isSelected = selectedPoint && selectedPoint.id === poi.id && selectedPoint.category === poi.category;
                    return (
                        <Marker
                            key={`${poi.category}-${poi.id}`}
                            position={[poi.coordinates.lat, poi.coordinates.lng]}
                            icon={isSelected ? (selectedIcons[poi.category] || selectedIcons.Default) : (icons[poi.category] || icons.Default)}
                            eventHandlers={{
                                click: () => onPointClick(poi)
                            }}
                        />
                    );
                })}
            </MapContainer>
        </div>
    );
}
