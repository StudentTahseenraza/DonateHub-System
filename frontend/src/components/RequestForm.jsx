// import { useState } from 'react';
// import LocationAutocomplete from './LocationAutocomplete';
// import axios from 'axios';

// const RequestForm = () => {
//   const [location, setLocation] = useState('');
// <LocationAutocomplete onPlaceSelected={(place) => setLocation(place)} />
//   const [formData, setFormData] = useState({
//     category: '',
//     itemName: '',
//     description: '',
//     location: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         'http://localhost:5000/api/request',
//         {
//           category: formData.category,
//           itemName: formData.itemName,
//           description: formData.description,
//           location: formData.location,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
//       console.log('Request submitted:', response.data);
//       alert('Request submitted successfully!');
//     } catch (err) {
//       console.error('Error submitting request:', err.response?.data || err.message);
//       alert('Failed to submit request. Please try again.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
//       <h3 className="mb-4">Request Items</h3>
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
//         <input
//           type="text"
//           name="location"
//           className="form-control"
//           value={formData.location}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <button type="submit" className="btn btn-success w-100">Submit</button>
//     </form>
//   );
// };

// export default RequestForm;


// import { useState } from "react";
// import axios from "axios";
// import LocationAutocomplete from "./LocationAutocomplete";
// import DeliveryOptions from "./DeliveryOptions";

// const RequestForm = ({ category }) => {
//   const [location, setLocation] = useState("");
//   const [deliveryOption, setDeliveryOption] = useState(null);
//   const [formData, setFormData] = useState({
//     category: category,
//     itemName: "",
//     description: "",
//     location: "",
//     condition: "", // Category-specific field
//     quantity: "", // For clothes, books, etc.
//   });

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
//       const response = await axios.post(
//         "http://localhost:5000/api/request",
//         {
//           category: formData.category,
//           itemName: formData.itemName,
//           description: formData.description,
//           location: formData.location,
//           condition: formData.condition, // Category-specific field
//           quantity: formData.quantity, // For clothes, books, etc.
//           deliveryOption: deliveryOption,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       console.log("Request submitted:", response.data);
//       alert("Request submitted successfully!");
//     } catch (err) {
//       console.error("Error submitting request:", err.response?.data || err.message);
//       alert("Failed to submit request. Please try again.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
//       <h3 className="mb-4">Request {category}</h3>

//       {/* Common Fields */}
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

//       {/* Category-Specific Fields */}
//       {category === "food" && (
//         <div className="mb-3">
//           <label className="form-label">Food Condition</label>
//           <select
//             name="condition"
//             className="form-select"
//             value={formData.condition}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Condition</option>
//             <option value="fresh">Fresh</option>
//             <option value="packed">Packed</option>
//             <option value="expired">Expired (for animal feed)</option>
//           </select>
//         </div>
//       )}

//       {category === "clothes" && (
//         <div className="mb-3">
//           <label className="form-label">Clothes Condition</label>
//           <select
//             name="condition"
//             className="form-select"
//             value={formData.condition}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Condition</option>
//             <option value="new">New</option>
//             <option value="used">Used (Good Condition)</option>
//             <option value="damaged">Damaged (for recycling)</option>
//           </select>
//         </div>
//       )}

//       {category === "books" && (
//         <div className="mb-3">
//           <label className="form-label">Book Condition</label>
//           <select
//             name="condition"
//             className="form-select"
//             value={formData.condition}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Condition</option>
//             <option value="new">New</option>
//             <option value="used">Used (Good Condition)</option>
//             <option value="damaged">Damaged (for recycling)</option>
//           </select>
//         </div>
//       )}

//       {/* Location Field */}
//       <div className="mb-3">
//         <label className="form-label">Location</label>
//         <LocationAutocomplete onPlaceSelected={(place) => setLocation(place)} />
//         {/* <input
//           type="text"
//           name="location"
//           className="form-control"
//           value={formData.location}
//           onChange={handleChange}
//           required
//         /> */}
//       </div>

//       {/* Delivery Options */}
//       <div className="mb-3">
//         <h4>Select Delivery Option</h4>
//         <DeliveryOptions onSelect={handleDeliverySelection} />
//       </div>

//       <button type="submit" className="btn btn-success w-100" disabled={!deliveryOption}>
//         Submit Request
//       </button>
//     </form>
//   );
// };

// export default RequestForm;

// import { useState } from "react";
// import axios from "axios";
// import DeliveryOptions from "./DeliveryOptions";

// const RequestForm = ({ category }) => {
//   const [deliveryOption, setDeliveryOption] = useState(null);
//   const [formData, setFormData] = useState({
//     category: category,
//     itemName: "",
//     description: "",
//     location: "", // Simple text input for location
//     condition: "",
//     quantity: "",
//   });

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
//       const response = await axios.post(
//         "http://localhost:5000/api/requests",
//         {
//           ...formData,
//           deliveryOption,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       console.log("Request submitted:", response.data);
//       alert("Request submitted successfully!");
//     } catch (err) {
//       console.error("Error submitting request:", err.response?.data || err.message);
//       alert("Failed to submit request. Please try again.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
//       <h3 className="mb-4">Request {category}</h3>

//       {/* Common Fields */}
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

//       {/* Category-Specific Fields */}
//       {category === "food" && (
//         <div className="mb-3">
//           <label className="form-label">Food Condition</label>
//           <select
//             name="condition"
//             className="form-select"
//             value={formData.condition}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Condition</option>
//             <option value="fresh">Fresh</option>
//             <option value="packed">Packed</option>
//             <option value="expired">Expired (for animal feed)</option>
//           </select>
//         </div>
//       )}

//       {category === "clothes" && (
//         <div className="mb-3">
//           <label className="form-label">Clothes Condition</label>
//           <select
//             name="condition"
//             className="form-select"
//             value={formData.condition}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Condition</option>
//             <option value="new">New</option>
//             <option value="used">Used (Good Condition)</option>
//             <option value="damaged">Damaged (for recycling)</option>
//           </select>
//         </div>
//       )}

//       {category === "books" && (
//         <div className="mb-3">
//           <label className="form-label">Book Condition</label>
//           <select
//             name="condition"
//             className="form-select"
//             value={formData.condition}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Condition</option>
//             <option value="new">New</option>
//             <option value="used">Used (Good Condition)</option>
//             <option value="damaged">Damaged (for recycling)</option>
//           </select>
//         </div>
//       )}

//       {/* Location Field */}
//       <div className="mb-3">
//         <label className="form-label">Location</label>
//         <input
//           type="text"
//           name="location"
//           className="form-control"
//           value={formData.location}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       {/* Delivery Options */}
//       <div className="mb-3">
//         <DeliveryOptions onSelect={handleDeliverySelection} />
//       </div>

//       <button type="submit" className="btn btn-success w-100" disabled={!deliveryOption}>
//         Submit Request
//       </button>
//     </form>
//   );
// };

// export default RequestForm;



import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import DeliveryOptions from "./DeliveryOptions";
import { jwtDecode } from "jwt-decode"; // Use named import instead of default
import foodLogo from "../assets/food-logo.png";
import clothesLogo from "../assets/clothes-logo.jpeg";
import booksLogo from "../assets/books-logo.png";

const socket = io('http://localhost:5000');

const RequestForm = ({ category }) => {
  const [donations, setDonations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [deliveryOption, setDeliveryOption] = useState(null);
  const [ngos, setNGOs] = useState([]);
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [userLocation, setUserLocation] = useState("");

  const getRandomColor = () => {
    const colors = [
      "#1DB954", "#FF5733", "#00C4CC", "#9B59B6", "#E74C3C",
      "#3498DB", "#F1C40F", "#2ECC71", "#E67E22", "#8E44AD",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/donations?category=${category}`);
        setDonations(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching donations:", err);
        setError("Failed to fetch donations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const liveLocation = `${position.coords.latitude},${position.coords.longitude}`;
          setUserLocation(liveLocation);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setUserLocation("0,0");
        }
      );
    }

    socket.on('newDonation', (newDonation) => {
      if (newDonation.category === category) {
        setDonations((prev) => [...prev, newDonation]);
      }
    });

    socket.on('itemRequested', (donation) => {
      setDonations((prev) =>
        prev.map((item) =>
          item._id === donation._id ? { ...item, isAvailable: false } : item
        )
      );
    });

    return () => {
      socket.off('newDonation');
      socket.off('itemRequested');
    };
  }, [category]);

  const fetchNGOs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/api/ngos/nearby?location=${userLocation}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNGOs(response.data);
    } catch (err) {
      console.error("Error fetching NGOs:", err);
      setError("Failed to fetch nearby NGOs.");
    }
  };

  const handleDeliverySelection = (option) => {
    setDeliveryOption(option);
    if (option === "NGO") {
      fetchNGOs();
    } else {
      setNGOs([]);
      setSelectedNGO(null);
    }
  };

  const handleRequestItem = async (donationId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to request an item.");
        return;
      }

      if (!deliveryOption) {
        alert("Please select a delivery option before submitting.");
        return;
      }

      if (deliveryOption === "NGO" && !selectedNGO) {
        alert("Please select an NGO before submitting.");
        return;
      }

      const decodedToken = jwtDecode(token); // Use named export
      const receiverId = decodedToken.userId;

      const response = await axios.post(
        `http://localhost:5000/api/request-item/${donationId}`,
        {
          receiverId,
          deliveryOption,
          ngoId: deliveryOption === "NGO" ? selectedNGO.id : undefined,
          requesterLocation: userLocation, // Add this
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Item requested successfully!");
      setSelectedDonation(null);
      setDeliveryOption(null);
      setNGOs([]);
      setSelectedNGO(null);
    } catch (err) {
      console.error("Error requesting item:", err);
      alert("Failed to request item. Please try again.");
    }
  };

  const filteredDonations = donations.filter((donation) =>
    donation.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryLogo = (category) => {
    switch (category) {
      case "food": return foodLogo;
      case "clothes": return clothesLogo;
      case "books": return booksLogo;
      default: return null;
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-white fw-bold">
        Available {category.charAt(0).toUpperCase() + category.slice(1)} Donations
      </h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder={`Search for ${category} items...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control rounded-pill"
        />
      </div>

      {loading && <p className="text-center text-muted">Loading donations...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      <div className="row">
        {!loading && !error && filteredDonations.length > 0 ? (
          filteredDonations.map((donation) => {
            const isExpired = donation.category === "food" && donation.expiryDate && new Date() > new Date(donation.expiryDate);
            const isUnavailable = !donation.isAvailable || isExpired;

            return (
              <div key={donation._id} className="col-md-4 mb-4">
                <div
                  className="card shadow-sm border-0 rounded-3"
                  style={{ background: getRandomColor(), color: "#FFFFFF" }}
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={getCategoryLogo(donation.category)}
                        alt={donation.category}
                        style={{ width: "40px", height: "40px", marginRight: "10px" }}
                      />
                      <h5 className="card-title">{donation.itemName}</h5>
                    </div>
                    <p className="card-text">{donation.description}</p>
                    <p className="card-text"><small>Location: {donation.location}</small></p>
                    {donation.photo && (
                      <img
                        src={`http://localhost:5000${donation.photo}`}
                        alt={donation.itemName}
                        className="img-fluid rounded mt-3"
                        style={{ maxHeight: "150px", objectFit: "cover" }}
                      />
                    )}
                    {isUnavailable ? (
                      <p className="text-danger mt-3">
                        {isExpired ? "This item has expired and is no longer available." : "This item is no longer available."}
                      </p>
                    ) : (
                      <button
                        className="btn btn-primary w-100 mt-3"
                        onClick={() => setSelectedDonation(donation._id)}
                      >
                        Request Item
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          !loading && !error && <p className="text-center text-muted">No donations available in this category.</p>
        )}
      </div>

      {selectedDonation && (
        <div className="modal" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Delivery Option</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedDonation(null)}
                ></button>
              </div>
              <div className="modal-body">
                <DeliveryOptions onSelect={handleDeliverySelection} />
                {deliveryOption === "NGO" && ngos.length > 0 && (
                  <div className="mt-3">
                    <h6>Select Nearby NGO</h6>
                    <select
                      className="form-select"
                      value={selectedNGO?.id || ""}
                      onChange={(e) => {
                        const ngo = ngos.find(n => n.id === e.target.value);
                        setSelectedNGO(ngo);
                      }}
                    >
                      <option value="">Select an NGO</option>
                      {ngos.map((ngo) => (
                        <option key={ngo.id} value={ngo.id}>
                          {ngo.name} ({ngo.distance} km)
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedDonation(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleRequestItem(selectedDonation)}
                  disabled={deliveryOption === "NGO" && !selectedNGO}
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestForm;