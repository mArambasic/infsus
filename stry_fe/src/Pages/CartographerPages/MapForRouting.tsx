import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import RoutingOSRM from "./RoutingOSRM";
import { LatLngExpression } from "leaflet";

export default function MapForRouting() {
  const position :LatLngExpression= [51.505, -0.09];

  return (
    <MapContainer center={position} zoom={6} style={{ height: "80vh", width : "100vw" }} maxBounds={[[90, -180], [-90, 180]]} minZoom={2}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
       
      />
      <RoutingOSRM />
    </MapContainer>
  );
}