// import { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// const OSMMap = () => {
//   const [location, setLocation] = useState({ lat: 0, lng: 0 });

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         setLocation({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//       });
//     }
//   }, []);

//   return (
//     <MapContainer center={location} zoom={13} style={{ height: "400px", width: "100%" }}>
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       <Marker position={location}>
//         <Popup>Your Current Location</Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default OSMMap;
