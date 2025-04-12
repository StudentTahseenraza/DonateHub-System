// import React from "react";
import "../styles/NotificationCenter.module.css";

const NotificationCenter = () => {
  const notifications = [
    { id: 1, message: "Your donation has been accepted!", timestamp: "2 hours ago" },
    { id: 2, message: "New request matches your donation.", timestamp: "5 hours ago" },
  ];

  return (
    <div className="notification-center">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id} className="notification-item">
            <p>{notification.message}</p>
            <span>{notification.timestamp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationCenter;