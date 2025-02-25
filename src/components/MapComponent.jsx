import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ lat, lon, city }) => {
  if (!lat || !lon) return null;

  return (
    <MapContainer center={[lat, lon]} zoom={10} style={{ height: "300px", width: "100%", borderRadius: "10px", marginTop: "20px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lon]}>
        <Popup>{city}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
