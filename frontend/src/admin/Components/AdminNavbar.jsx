// src/admin/Components/AdminNavbar.jsx
// import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../admin.css';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <nav className="admin-navbar">
      <div className="navbar-brand">Admin Panel</div>
      <div className="navbar-actions">
        <button className="logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;