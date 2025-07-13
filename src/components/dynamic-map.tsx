'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Mock Data
const mockDrivers = [
  { id: 1, name: 'Antônio', rating: 4.8, car: 'Fiat Cronos', distance: '5 min', position: [-3.742, -38.535] as [number, number] },
  { id: 2, name: 'Lúcia', rating: 4.9, car: 'Hyundai HB20', distance: '8 min', position: [-3.750, -38.550] as [number, number] },
  { id: 3, name: 'Carlos', rating: 4.7, car: 'Chevrolet Onix', distance: '12 min', position: [-3.725, -38.512] as [number, number] },
];

const userPosition = [-3.74, -38.54] as [number, number]; // Mock user position in Fortaleza

interface MapComponentProps {
    center: [number, number];
    drivers?: typeof mockDrivers;
    userPos?: [number, number];
    rideRequest?: {
        from: { address: string; position: [number, number] };
        to: { address: string; position: [number, number] };
    };
}

const userIcon = new L.DivIcon({
    html: `<div class="p-2 bg-blue-500 rounded-full border-2 border-white shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

const driverIcon = new L.DivIcon({
    html: `<div class="p-1 bg-card rounded-full border-2 border-primary shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-2.2-1.8-4-4-4H6c-2.2 0-4 1.8-4 4v3c0 .6.4 1 1 1h2"/><path d="M12 17V9"/><path d="M6 17h12"/><circle cx="6" cy="17" r="2"/><circle cx="18"cy="17" r="2"/></svg></div>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

const fromIcon = new L.DivIcon({html: '<div class="bg-green-500 text-white font-bold w-8 h-8 flex items-center justify-center rounded-full border-2 border-white shadow-md">A</div>', className: '', iconSize: [32,32], iconAnchor: [16,16]});
const toIcon = new L.DivIcon({html: '<div class="bg-red-500 text-white font-bold w-8 h-8 flex items-center justify-center rounded-full border-2 border-white shadow-md">B</div>', className: '', iconSize: [32,32], iconAnchor: [16,16]});


export default function MapComponent({ center, drivers, userPos, rideRequest }: MapComponentProps) {
    const routePositions = rideRequest ? [rideRequest.from.position, rideRequest.to.position] : [];

    return (
        <MapContainer center={center} zoom={14} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {userPos && <Marker position={userPos} icon={userIcon}><Popup>Você está aqui</Popup></Marker>}
            
            {drivers && drivers.map(driver => (
                <Marker key={driver.id} position={driver.position} icon={driverIcon}>
                    <Popup>{driver.name} - {driver.car}<br/>Nota: {driver.rating}</Popup>
                </Marker>
            ))}

            {rideRequest && (
                <>
                    <Marker position={rideRequest.from.position} icon={fromIcon}>
                        <Popup>Partida: {rideRequest.from.address}</Popup>
                    </Marker>
                    <Marker position={rideRequest.to.position} icon={toIcon}>
                         <Popup>Destino: {rideRequest.to.address}</Popup>
                    </Marker>
                    <Polyline positions={routePositions} color="hsl(var(--primary))" weight={5} opacity={0.7} />
                </>
            )}
        </MapContainer>
    );
}
    