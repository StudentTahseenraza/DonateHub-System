import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

// Default map center (can be overridden via props)
const defaultCenter = {
  lat: 17.426772, // Default latitude
  lng: 78.3591301, // Default longitude
};

// Default map styles
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const MapComponent = ({ location }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      zoom={15} // Zoom level (adjust as needed)
      center={{ lat: location.latitude, lng: location.longitude }} // Center the map on the location
      mapContainerStyle={mapContainerStyle}
    >
      <Marker position={{ lat: location.latitude, lng: location.longitude }} /> // Add a marker at the location
    </GoogleMap>
  );
};

export default MapComponent;