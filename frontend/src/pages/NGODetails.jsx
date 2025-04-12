import { useState, useEffect } from "react";
import axios from "axios";

const TopRatedNGOs = () => {
  const [ngos, setNgos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopRatedNGOs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/ngo/top-rated");
        setNgos(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching top-rated NGOs:", err.response?.data || err.message);
        setError("Failed to fetch top-rated NGOs. Please try again.");
      }
    };

    fetchTopRatedNGOs();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Top-Rated NGOs</h2>
      {error && <div className="alert alert-danger">{error}</div>}
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

export default TopRatedNGOs;