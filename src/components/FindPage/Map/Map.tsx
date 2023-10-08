// Map.tsx
"use client"
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { defaultTheme } from './Theme';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY

const containerStyle = {
    width: '100%',
    height: '400px', // установим минимальную высоту для мобильных устройств
    borderRadius: '10px',
};

type MapProps = {
    center?: {
        lat: number;
        lng: number;
    };
    zoom?: number;
};

export const Map: React.FC<MapProps> = ({ center, zoom }) => {
    const defaultOptions = {
        panControl: true,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        clickableIcons: false,
        keyboardShortcuts: false,
        scrollwheel: false,
        disableDoubleClickZoom: false,
        fullscreenControl: false,
        styles: defaultTheme,
    };

    return (
        <LoadScript googleMapsApiKey={API_KEY!}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center || { lat: 43.520852, lng: 2.395329 }}
                zoom={zoom || 15}
                options={defaultOptions}
            >
                <Marker position={{ lat: 43.520852, lng: 2.395329 }} />
            </GoogleMap>
        </LoadScript>
    );
};

Map.defaultProps = {
    center: {
        lat: 43.520852,
        lng: 2.395329,
    },
    zoom: 15,
};
