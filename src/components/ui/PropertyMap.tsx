'use client';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon path issues in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom highlighted icon for featured/active properties
const highlightIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to dynamically fit bounds when markers change
function MapController({ markers }: { markers: any[] }) {
  const map = useMap();
  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
    }
  }, [markers, map]);
  return null;
}

export interface MapMarker {
  id: string | number;
  lat: number;
  lng: number;
  title: string;
  price?: string;
  featured?: boolean;
}

interface PropertyMapProps {
  center?: [number, number];
  markers: MapMarker[];
  className?: string;
}

export default function PropertyMap({ center = [51.505, -0.09], markers, className = '' }: PropertyMapProps) {
  // Use the first marker as center if available, otherwise fallback
  const mapCenter = markers.length > 0 ? [markers[0].lat, markers[0].lng] : center;

  return (
    <div className={`w-full h-full relative z-0 pw-reveal is-visible ${className}`}>
      <MapContainer 
        center={mapCenter as [number, number]} 
        zoom={13} 
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false} // We can hide default zoom control to look cleaner
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker 
            key={marker.id} 
            position={[marker.lat, marker.lng]}
            icon={marker.featured ? highlightIcon : new L.Icon.Default()}
            zIndexOffset={marker.featured ? 1000 : 0}
          >
            <Popup>
              <div className="font-sans">
                {marker.price && <div className="font-bold text-lg text-primary">{marker.price}</div>}
                <div className="text-sm text-on-surface-variant">{marker.title}</div>
              </div>
            </Popup>
          </Marker>
        ))}
        <MapController markers={markers} />
      </MapContainer>
    </div>
  );
}
