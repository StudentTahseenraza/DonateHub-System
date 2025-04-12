// import React from "react";
// import "../styles/Badges.module.css";

const Badges = () => {
  const badges = [
    { id: 1, name: "Bronze", icon: "🥉" },
    { id: 2, name: "Silver", icon: "🥈" },
    { id: 3, name: "Gold", icon: "🥇" },
  ];

  return (
    <div className="badges-container">
      <h2>Badges</h2>
      <div className="badges-list">
        {badges.map((badge) => (
          <div key={badge.id} className="badge-item">
            <span>{badge.icon}</span>
            <p>{badge.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badges;