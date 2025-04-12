import { useState } from "react";
import axios from "axios";

const NGORating = ({ ngoId }) => {
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");

  const handleRating = async (value) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/ngo/rate",
        { ngoId, rating: value },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Rating submitted:", response.data);
      setRating(value);
      setError("");
    } catch (err) {
      console.error("Error submitting rating:", err.response?.data || err.message);
      setError("Failed to submit rating. Please try again.");
    }
  };

  return (
    <div>
      <h4>Rate this NGO</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <div>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            className={`btn btn-outline-primary ${rating >= value ? "active" : ""}`}
            onClick={() => handleRating(value)}
          >
            ⭐
          </button>
        ))}
      </div>
    </div>
  );
};

export default NGORating;