import { useState,} from "react";
import axios from "axios";

const NGOSearch = () => {
  const [location, setLocation] = useState("");
  const [ngos, setNgos] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!location) {
      setError("Please enter a location.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/ngo/search?location=${location}`);
      setNgos(response.data);
      setError("");
    } catch (err) {
      console.error("Error searching NGOs:", err.response?.data || err.message);
      setError("Failed to search NGOs. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Search NGOs</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label className="form-label">Enter Location</label>
        <input
          type="text"
          className="form-control"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <button className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>

      <div className="mt-4">
        {ngos.map((ngo) => (
          <div key={ngo._id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{ngo.name}</h5>
              <p className="card-text">{ngo.description}</p>
              <p className="card-text">
                <strong>Location:</strong> {ngo.location}
              </p>
              <p className="card-text">
                <strong>Rating:</strong> {ngo.rating} ⭐
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NGOSearch;