// import React from "react";
import "../styles/Stats.module.css";
const StatsCard = ({ title, value }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default StatsCard;