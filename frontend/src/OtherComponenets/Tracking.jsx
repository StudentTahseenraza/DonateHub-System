import React from "react";
import "../styles/Tracking.module.css";

const Tracking = () => {
  const status = "In Transit"; // Example status

  return (
    <div className="tracking-container">
      <h2>Tracking Status</h2>
      <div className="tracking-status">
        <p>Current Status: <span>{status}</span></p>
      </div>
    </div>
  );
};

export default Tracking;