import React from "react";
import "../styles/ShareButton.module.css";

const ShareButton = () => {
  const handleShare = () => {
    alert("Share your achievement on social media!");
  };

  return (
    <button className="share-button" onClick={handleShare}>
      Share
    </button>
  );
};

export default ShareButton;