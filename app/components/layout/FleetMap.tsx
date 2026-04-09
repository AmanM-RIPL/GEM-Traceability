"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FleetTrackingData } from "@/data/user";

// Fix marker issue
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom truck icon
const truckIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/ios-filled/50/000000/truck.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function FleetMap() {
  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-md ">
      <MapContainer
        center={[28.4595, 77.0266]}
        zoom={9}
        className="h-full w-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {FleetTrackingData.map((item) => {
          const current = [
            item.currentLocation.latitude,
            item.currentLocation.longitude,
          ] as [number, number];

          const destination = [
            item.destination.latitude,
            item.destination.longitude,
          ] as [number, number];

          return (
            <>
              {/* Current Location Marker */}
              <Marker key={item.vehicleId + "-current"} position={current} icon={truckIcon}>
                <Popup>
                  <div>
                    <h3 className="font-bold">🚚 {item.driverName}</h3>
                    <p>Current: {item.currentLocation.address}</p>
                    <p>Status: {item.status}</p>
                  </div>
                </Popup>
              </Marker>

              {/* Destination Marker */}
              <Marker
                key={item.vehicleId + "-destination"}
                position={destination}
              >
                <Popup>
                  <div>
                    <h3 className="font-bold">📍 Destination</h3>
                    <p>{item.destination.address}</p>
                  </div>
                </Popup>
              </Marker>

              {/* Route Line */}
              <Polyline
                positions={[current, destination]}
                pathOptions={{ color: "#046A38", weight: 4 }}
              />
            </>
          );
        })}
      </MapContainer>
    </div>
  );
}