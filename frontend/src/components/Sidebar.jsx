import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Settings from './Settings';
import './Sidebar.css';
import logo from '../assets/menu.svg'; // Import your logo image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faCog, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'; // Import icons

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const foodRes = await axios.get('http://localhost:5000/api/food-donations', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const bookRes = await axios.get('http://localhost:5000/api/book-donations', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const foodNotifications = foodRes.data.map((donation) => ({
          type: 'Food Donation',
          item: donation.itemName,
          donor: donation.donorId.name,
        }));

        const bookNotifications = bookRes.data.map((donation) => ({
          type: 'Book Donation',
          item: donation.itemName,
          donor: donation.donorId.name,
        }));

        setNotifications([...foodNotifications, ...bookNotifications]);
      } catch (err) {
        console.error('Error fetching notifications:', err.response?.data || err.message);
      }
    };

    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Replace the "Menu" button with a logo */}
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <img src={logo} alt="Logo" style={{ width: '40px', height: '40px', cursor: 'pointer' }} />
      </div>

      <div className={`sidebar ${isOpen ? 'open' : ''} ${darkMode ? 'dark-mode' : ''}`}>
        <h3>Quick Links</h3>
        <ul>
          <li><Link to="/" onClick={toggleSidebar}>Home</Link></li>
          <li><Link to="/donate" onClick={toggleSidebar}>Donate</Link></li>
          <li><Link to="/request" onClick={toggleSidebar}>Request</Link></li>
          <li><Link to="/leaderboard" onClick={toggleSidebar}>Leaderboard</Link></li>
          <li><Link to="/about" onClick={toggleSidebar}>About</Link></li>
          <li><Link to="/mission" onClick={toggleSidebar}>Mission</Link></li>
          <li><Link to="/profile" onClick={toggleSidebar}>My Profile</Link></li>
        </ul>

        <h3>Notifications</h3>
        <ul>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                <strong>{notification.type}:</strong> {notification.item} by {notification.donor}
              </li>
            ))
          ) : (
            <li>No new notifications.</li>
          )}
        </ul>

        <ul>
          {/* <li><Link to="/profile" onClick={toggleSidebar}>My Profile</Link></li> */}
          <li>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/auth';
              }}
            >
              Logout
            </button>
          </li>
        </ul>

        <h5>Settings</h5>
        <button
          onClick={() => setShowSettings(!showSettings)}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <FontAwesomeIcon icon={faCog} size="2x" color={darkMode ? '#fff' : '#007bff'} /> {/* Settings icon */}
        </button>
        {showSettings && <Settings />}

        <h5>Dark Mode</h5>
        <button
          onClick={toggleDarkMode}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} size="2x" color={darkMode ? '#ffcc00' : '#333'} /> {/* Dark/Light mode icon */}
        </button>
      </div>
    </>
  );
};

export default Sidebar;