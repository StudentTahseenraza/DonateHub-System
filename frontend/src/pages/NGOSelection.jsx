import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NGOSelection = () => {
  const [ngos, setNgos] = useState([]);
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNGOs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/ngo/nearby");
        setNgos(response.data);
      } catch (err) {
        console.error("Error fetching NGOs:", err.response?.data || err.message);
        setError("Failed to fetch NGOs. Please try again.");
      }
    };

    fetchNGOs();
  }, []);

  const handleSelectNGO = (ngoId) => {
    setSelectedNGO(ngoId);
  };

  const handleSubmit = async () => {
    if (!selectedNGO) {
      setError("Please select an NGO.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/donation/assign-ngo",
        { ngoId: selectedNGO },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/donate"); // Redirect to donation page
    } catch (err) {
      console.error("Error assigning NGO:", err.response?.data || err.message);
      setError("Failed to assign NGO. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Select a Nearby NGO</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mt-4">
        {ngos.map((ngo) => (
          <div
            key={ngo._id}
            className={`card mb-3 ${selectedNGO === ngo._id ? "border-primary" : ""}`}
            onClick={() => handleSelectNGO(ngo._id)}
            style={{ cursor: "pointer" }}
          >
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
      <button className="btn btn-primary" onClick={handleSubmit}>
        Confirm NGO
      </button>
    </div>
  );
};

export default NGOSelection;