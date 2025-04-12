// import { useState } from 'react';
// // import LocationAutocomplete from './LocationAutocomplete';
// import axios from 'axios';
// import OSMMap from './OSMMap';

// const DonateForm = () => {
//   const [location, setLocation] = useState('');
//   const [formData, setFormData] = useState({
//     category: '',
//     itemName: '',
//     description: '',
//     photo: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {

//       const token = localStorage.getItem('token');
//       if (!token) {
//         alert('You must be logged in to submit a donation.');
//         return;
//       }
//       const data = new FormData();
//       data.append('category', formData.category);
//       data.append('itemName', formData.itemName);
//       data.append('description', formData.description);
//       data.append('location', location); // Use the location state
//       if (formData.photo) {
//         data.append('photo', formData.photo);
//       }

//       const response = await axios.post('http://localhost:5000/api/donation', data, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('Donation submitted:', response.data);
//       alert('Donation submitted successfully!');
//     } catch (err) {
//       console.error('Error submitting donation:', err.response?.data || err.message);
//       alert('Failed to submit donation. Please try again.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
//       <h3 className="mb-4">Donate Items</h3>
//       <div className="mb-3">
//         <label className="form-label">Category</label>
//         <select
//           name="category"
//           className="form-select"
//           value={formData.category}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Category</option>
//           <option value="food">Food</option>
//           <option value="clothes">Clothes & Footwear</option>
//           <option value="books">Books & Stationery</option>
//           <option value="furniture">Furniture & Gadgets</option>
//           <option value="compost">Animal Feed & Compost Waste</option>
//         </select>
//       </div>
//       <div className="mb-3">
//         <label className="form-label">Item Name</label>
//         <input
//           type="text"
//           name="itemName"
//           className="form-control"
//           value={formData.itemName}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div className="mb-3">
//         <label className="form-label">Description</label>
//         <textarea
//           name="description"
//           className="form-control"
//           value={formData.description}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div className="mb-3">
//         <label className="form-label">Location</label>
//         <div>
//       <h2>Real-Time Location</h2>
//       <OSMMap />
//     </div>
//       </div>
//       <div className="mb-3">
//         <label className="form-label">Upload Photo</label>
//         <input
//           type="file"
//           name="photo"
//           className="form-control"
//           onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
//         />
//       </div>
//       <button type="submit" className="btn btn-primary w-100">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default DonateForm;



// import { useState, useEffect } from "react";
// import axios from "axios";
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// const DonateForm = () => {
//   const [formData, setFormData] = useState({
//     category: "",
//     itemName: "",
//     description: "",
//     photo: null,
//   });

//   const [location, setLocation] = useState({ lat: 0, lng: 0 });

//   // Get user's real-time location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         (error) => console.error("Error fetching location:", error)
//       );
//     }
//   }, []);

//   // Allow users to manually select location
//   function LocationMarker() {
//     useMapEvents({
//       click(e) {
//         setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
//       },
//     });
//     return <Marker position={location} />;
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("You must be logged in to submit a donation.");
//         return;
//       }

//       const data = new FormData();
//       data.append("category", formData.category);
//       data.append("itemName", formData.itemName);
//       data.append("description", formData.description);
//       data.append("location", JSON.stringify(location)); // Sending location as JSON string
//       if (formData.photo) {
//         data.append("photo", formData.photo);
//       }

//       const response = await axios.post("http://localhost:5000/api/donation", data, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       console.log("Donation submitted:", response.data);
//       alert("Donation submitted successfully!");
//     } catch (err) {
//       console.error("Error submitting donation:", err.response?.data || err.message);
//       alert("Failed to submit donation. Please try again.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
//       <h3 className="mb-4">Donate Items</h3>
//       <div className="mb-3">
//         <label className="form-label">Category</label>
//         <select
//           name="category"
//           className="form-select"
//           value={formData.category}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Category</option>
//           <option value="food">Food</option>
//           <option value="clothes">Clothes & Footwear</option>
//           <option value="books">Books & Stationery</option>
//           <option value="furniture">Furniture & Gadgets</option>
//           <option value="compost">Animal Feed & Compost Waste</option>
//         </select>
//       </div>
//       <div className="mb-3">
//         <label className="form-label">Item Name</label>
//         <input
//           type="text"
//           name="itemName"
//           className="form-control"
//           value={formData.itemName}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div className="mb-3">
//         <label className="form-label">Description</label>
//         <textarea
//           name="description"
//           className="form-control"
//           value={formData.description}
//           onChange={handleChange}
//           required
//         />
//       </div>
      
//       {/* Real-Time Location Map */}
//       <div className="mb-3">
//         <label className="form-label">Select Location</label>
//         <MapContainer center={location} zoom={13} style={{ height: "300px", width: "100%" }}>
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <LocationMarker />
//         </MapContainer>
//         <p className="mt-2">Latitude: {location.lat}, Longitude: {location.lng}</p>
//       </div>

//       <div className="mb-3">
//         <label className="form-label">Upload Photo</label>
//         <input
//           type="file"
//           name="photo"
//           className="form-control"
//           onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
//         />
//       </div>
//       <button type="submit" className="btn btn-primary w-100">
//         Submit Donation
//       </button>
//     </form>
//   );
// };

// export default DonateForm;



// import { useState, useEffect } from "react";
// import axios from "axios";
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import DeliveryOptions from "../components/DeliveryOptions";

// const DonateForm = () => {
//   const [formData, setFormData] = useState({
//     category: "",
//     itemName: "",
//     description: "",
//     photo: null,
//   });

//   const [location, setLocation] = useState({ lat: 0, lng: 0 });
//   const [deliveryOption, setDeliveryOption] = useState(null); // New state for delivery selection
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   // Get user's real-time location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         (error) => console.error("Error fetching location:", error)
//       );
//     }
//   }, []);

//   // Allow users to manually select location
//   function LocationMarker() {
//     useMapEvents({
//       click(e) {
//         setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
//       },
//     });
//     return <Marker position={location} />;
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleDeliverySelection = (option) => {
//     setDeliveryOption(option);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!deliveryOption) {
//       alert("Please select a delivery option before submitting.");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("You must be logged in to submit a donation.");
//         return;
//       }

//       const data = new FormData();
//       data.append("category", formData.category);
//       data.append("itemName", formData.itemName);
//       data.append("description", formData.description);
//       data.append("location", JSON.stringify(location)); // Sending location as JSON string
//       data.append("deliveryOption", deliveryOption); // Include selected delivery option

//       if (formData.photo) {
//         data.append("photo", formData.photo);
//       }

//       const response = await axios.post("http://localhost:5000/api/donation", data, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       console.log("Donation submitted:", response.data);
//       alert("Donation submitted successfully!");
//       setFormSubmitted(true);
//     } catch (err) {
//       console.error("Error submitting donation:", err.response?.data || err.message);
//       alert("Failed to submit donation. Please try again.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
//       <h3 className="mb-4">Donate Items</h3>
//       <div className="mb-3">
//         <label className="form-label">Category</label>
//         <select
//           name="category"
//           className="form-select"
//           value={formData.category}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Category</option>
//           <option value="food">Food</option>
//           <option value="clothes">Clothes & Footwear</option>
//           <option value="books">Books & Stationery</option>
//           <option value="furniture">Furniture & Gadgets</option>
//           <option value="compost">Animal Feed & Compost Waste</option>
//         </select>
//       </div>
//       <div className="mb-3">
//         <label className="form-label">Item Name</label>
//         <input
//           type="text"
//           name="itemName"
//           className="form-control"
//           value={formData.itemName}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div className="mb-3">
//         <label className="form-label">Description</label>
//         <textarea
//           name="description"
//           className="form-control"
//           value={formData.description}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       {/* Real-Time Location Map */}
//       <div className="mb-3">
//         <label className="form-label">Select Location</label>
//         <MapContainer center={location} zoom={13} style={{ height: "300px", width: "100%" }}>
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <LocationMarker />
//         </MapContainer>
//         <p className="mt-2">Latitude: {location.lat}, Longitude: {location.lng}</p>
//       </div>

//       <div className="mb-3">
//         <label className="form-label">Upload Photo</label>
//         <input
//           type="file"
//           name="photo"
//           className="form-control"
//           onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
//         />
//       </div>

//       {/* Delivery Options */}
//       <div className="mb-3">
//         <h4>Select Delivery Option</h4>
//         <DeliveryOptions onSelect={handleDeliverySelection} />
//       </div>

//       <button type="submit" className="btn btn-primary w-100" disabled={!deliveryOption}>
//         Submit Donation
//       </button>

//       {formSubmitted && <p className="mt-3 text-success">Thank you for your donation!</p>}
//     </form>
//   );
// };

// export default DonateForm;


// import { useState, useEffect } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";
// import DeliveryOptions from "./DeliveryOptions";

// // Only connect if server is running
// const socket = io('http://localhost:5000', { 
//   reconnection: true,
//   transports: ['websocket', 'polling'], // Fallback to polling if websocket fails
// });

// const DonateForm = ({ category }) => {
//   const [formData, setFormData] = useState({
//     category: category,
//     itemName: "",
//     description: "",
//     condition: "",
//     expiryDate: "",
//     quantity: "",
//     photo: null,
//     location: "",
//   });

//   const [deliveryOption, setDeliveryOption] = useState(null);
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const [realTimeStatus, setRealTimeStatus] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     console.log("Component mounted, category:", category);
//     if (navigator.geolocation) {
//       navigator.geolocation.watchPosition(
//         (position) => {
//           const liveLocation = `${position.coords.latitude}, ${position.coords.longitude}`;
//           setFormData((prev) => ({ ...prev, location: liveLocation }));
//           console.log("Live location set:", liveLocation);
//         },
//         (error) => {
//           console.error("Geolocation error:", error);
//           setFormData((prev) => ({ ...prev, location: "Default: 0, 0" }));
//           setErrorMessage("Using default location due to geolocation failure.");
//         },
//         { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//       );
//     } else {
//       setFormData((prev) => ({ ...prev, location: "Default: 0, 0" }));
//       setErrorMessage("Geolocation not supported.");
//     }

//     socket.on('connect', () => console.log("Socket.IO connected"));
//     socket.on('connect_error', (err) => console.error("Socket.IO connection error:", err));
//     socket.on('newDonation', (donation) => {
//       console.log("New donation received:", donation);
//       if (donation.category === category) {
//         setRealTimeStatus(`New ${donation.itemName} donation received!`);
//         setTimeout(() => setRealTimeStatus(""), 5000);
//       }
//     });

//     return () => {
//       socket.off('connect');
//       socket.off('connect_error');
//       socket.off('newDonation');
//     };
//   }, [category]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleDeliverySelection = (option) => {
//     setDeliveryOption(option);
//     console.log("Delivery option set:", option);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Submit button clicked, form data:", formData, "deliveryOption:", deliveryOption);

//     if (!deliveryOption) {
//       setErrorMessage("Please select a delivery option.");
//       return;
//     }

//     if (!formData.itemName.trim() || !formData.description.trim() || !formData.location.trim()) {
//       setErrorMessage("Please fill all required fields.");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       console.log("Token used:", token);

//       const data = new FormData();
//       data.append("category", formData.category);
//       data.append("itemName", formData.itemName);
//       data.append("description", formData.description);
//       if (formData.condition) data.append("condition", formData.condition);
//       if (formData.expiryDate) data.append("expiryDate", formData.expiryDate);
//       if (formData.quantity) data.append("quantity", Number(formData.quantity));
//       if (formData.photo) data.append("photo", formData.photo);
//       data.append("location", formData.location);
//       data.append("deliveryOption", deliveryOption);

//       console.log("Sending POST request...");
//       const response = await axios.post("http://localhost:5000/api/donation", data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       console.log("Success response:", response.data);
//       setFormSubmitted(true);
//       setErrorMessage("");
//     } catch (err) {
//       console.error("Error during submission:", err.response?.data || err.message);
//       setErrorMessage(`Submission failed: ${err.response?.data?.error || err.message}`);
//     }
//   };

//   return (
//     <div className="card shadow-lg border-0 rounded-3" style={{ backgroundColor: "#2C2F33" }}>
//       <div className="card-body p-4">
//         <h3 className="card-title text-center mb-4 text-white fw-semibold">
//           Donate {category.charAt(0).toUpperCase() + category.slice(1)}
//         </h3>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label text-white">Item Name</label>
//             <input
//               type="text"
//               name="itemName"
//               className="form-control rounded-pill"
//               value={formData.itemName}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label text-white">Description</label>
//             <textarea
//               name="description"
//               className="form-control rounded-3"
//               value={formData.description}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {category === "food" && (
//             <div className="mb-3">
//               <label className="form-label text-white">Food Condition</label>
//               <select
//                 name="condition"
//                 className="form-select rounded-pill"
//                 value={formData.condition}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select Condition</option>
//                 <option value="fresh">Fresh</option>
//                 <option value="packed">Packed</option>
//                 <option value="expired">Expired (for animal feed)</option>
//               </select>
//             </div>
//           )}

//           <div className="mb-3">
//             <label className="form-label text-white">Live Location</label>
//             <input
//               type="text"
//               name="location"
//               className="form-control rounded-pill"
//               value={formData.location}
//               readOnly
//               placeholder="Fetching live location..."
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label text-white">Upload Photo</label>
//             <input
//               type="file"
//               name="photo"
//               className="form-control rounded-pill"
//               onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
//             />
//           </div>

//           <div className="mb-4">
//             <DeliveryOptions onSelect={handleDeliverySelection} />
//           </div>

//           <div className="text-center">
//             <button
//               type="submit"
//               className="btn btn-primary btn-lg px-5 py-2 rounded-pill fw-bold shadow-sm"
//               disabled={!deliveryOption || !formData.location || formSubmitted}
//               style={{ backgroundColor: "#1DB954", borderColor: "#1DB954" }}
//             >
//               Submit Donation
//             </button>
//           </div>

//           {formSubmitted && (
//             <p className="mt-3 text-success text-center">Thank you for your donation!</p>
//           )}
//           {realTimeStatus && (
//             <p className="mt-3 text-info text-center">{realTimeStatus}</p>
//           )}
//           {errorMessage && (
//             <p className="mt-3 text-danger text-center">{errorMessage}</p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DonateForm;


import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5000", {
  reconnection: true,
  transports: ["websocket", "polling"],
});

const DonateForm = ({ category }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: category,
    itemName: "",
    description: "",
    condition: category === "books" ? "" : undefined,
    photo: null,
    location: "",
    type: category === "books" ? "donate" : undefined, // Only for books
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [realTimeStatus, setRealTimeStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const liveLocation = `${position.coords.latitude}, ${position.coords.longitude}`;
          setFormData((prev) => ({ ...prev, location: liveLocation }));
          console.log("Live location set:", liveLocation);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setFormData((prev) => ({ ...prev, location: "Default: 0, 0" }));
          setErrorMessage("Using default location due to geolocation failure.");
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setFormData((prev) => ({ ...prev, location: "Default: 0, 0" }));
      setErrorMessage("Geolocation not supported.");
    }

    socket.on("connect", () => console.log("Socket.IO connected"));
    socket.on("connect_error", (err) => console.error("Socket.IO connection error:", err));
    socket.on("newDonation", (donation) => {
      console.log("New donation received:", donation);
      if (donation.category === category) {
        setRealTimeStatus(`New ${donation.itemName} donation received!`);
        setTimeout(() => setRealTimeStatus(""), 5000);
      }
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("newDonation");
    };
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked, form data:", formData);

    if (!formData.itemName.trim() || !formData.description.trim() || !formData.location.trim()) {
      setErrorMessage("Please fill all required fields.");
      return;
    }

    if (category === "books" && (!formData.type || !formData.condition)) {
      setErrorMessage("Please select type and condition for books.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("You must be logged in to submit a donation. Please log in again.");
        navigate("/login");
        return;
      }

      console.log("Token used:", token);

      const data = new FormData();
      data.append("category", formData.category);
      data.append("itemName", formData.itemName);
      data.append("description", formData.description);
      if (formData.condition) data.append("condition", formData.condition);
      if (formData.photo) data.append("photo", formData.photo);
      data.append("location", formData.location);
      if (category === "books") data.append("type", formData.type); // Only send type for books

      console.log("Sending POST request...");
      const response = await axios.post("http://localhost:5000/api/donation", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Success response:", response.data);
      setFormSubmitted(true);
      setErrorMessage("");
      socket.emit("newDonation", response.data);
    } catch (err) {
      console.error("Error during submission:", err.response?.data || err.message);
      if (err.response?.status === 401 || err.response?.data?.error === "Invalid token.") {
        setErrorMessage("Your session has expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setErrorMessage(`Submission failed: ${err.response?.data?.error || err.message}`);
      }
    }
  };

  return (
    <div
      className="card shadow-lg border-0 rounded-3"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(11px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
      }}
    >
      <div className="card-body p-4">
        <h3 className="card-title text-center mb-4 text-white fw-semibold">
          {category === "books" && formData.type === "exchange" ? "Exchange" : "Donate"}{" "}
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h3>
        <form onSubmit={handleSubmit}>
          {/* Books-specific fields */}
          {category === "books" && (
            <>
              <div className="mb-3">
                <h4 className="form-label text-black">Type</h4>
                <select
                  name="type"
                  className="form-select rounded-pill"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="donate">Donate</option>
                  <option value="exchange">Exchange</option>
                </select>
              </div>
              <div className="mb-3">
                <h4 className="form-label text-black">Condition</h4>
                <select
                  name="condition"
                  className="form-select rounded-pill"
                  value={formData.condition}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Condition</option>
                  <option value="new">New</option>
                  <option value="used">Used - Good Condition</option>
                  <option value="fair">Used - Fair Condition</option>
                </select>
              </div>
            </>
          )}

          {/* Common fields for all categories */}
          <div className="mb-3">
            <h4 className="form-label text-black">Item Name</h4>
            <input
              type="text"
              name="itemName"
              className="form-control rounded-pill"
              value={formData.itemName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <h4 className="form-label text-black">Description</h4>
            <input
              type="text"
              name="description"
              className="form-control rounded-pill"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <h4 className="form-label text-black">Live Location</h4>
            <input
              type="text"
              name="location"
              className="form-control rounded-pill"
              value={formData.location}
              readOnly
              placeholder="Fetching live location..."
            />
          </div>
          <div className="mb-3">
            <h4 className="form-label text-black">Upload Photo</h4>
            <input
              type="file"
              name="photo"
              className="form-control rounded-pill"
              onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-success btn-lg px-5 py-2 rounded-pill fw-bold shadow-sm"
              disabled={!formData.location || formSubmitted}
              style={{ backgroundColor: "#06402B", borderColor: "black" }}
            >
              {category === "books" && formData.type === "exchange"
                ? "Submit Exchange Request"
                : "Submit Donation"}
            </button>
          </div>
          {formSubmitted && (
            <p className="mt-3 text-success text-center">
              Thank you for your{" "}
              {category === "books" && formData.type === "exchange" ? "exchange request" : "donation"}!
            </p>
          )}
          {realTimeStatus && <p className="mt-3 text-info text-center">{realTimeStatus}</p>}
          {errorMessage && <p className="mt-3 text-danger text-center">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default DonateForm;