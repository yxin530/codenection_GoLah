"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapBoundsUpdater({ positions }: { positions: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [positions, map]);
  return null;
}

export default function LeafletMap({ stops = [] }: { stops?: { name: string, lat: number, lng: number }[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const positions: [number, number][] = stops.map(stop => [stop.lat, stop.lng]);
  const defaultCenter: [number, number] = positions.length > 0 ? positions[0] : [35.6895, 139.6917];

  return (
    <MapContainer 
      center={defaultCenter} 
      zoom={13} 
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {stops.map((stop, index) => (
        <Marker key={index} position={[stop.lat, stop.lng]}>
          <Popup>
            <div className="font-bold">{stop.name}</div>
          </Popup>
        </Marker>
      ))}

      {positions.length > 1 && (
        <Polyline 
          positions={positions} 
          color="#3b82f6" 
          weight={5}
          dashArray="10, 10" 
        />
      )}
      
      <MapBoundsUpdater positions={positions} />
    </MapContainer>
  );
}
