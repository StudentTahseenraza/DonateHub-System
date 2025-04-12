// import React from "react";
import "../styles/ProgressBar.module.css";

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <span>{progress}%</span>
    </div>
  );
};

export default ProgressBar;