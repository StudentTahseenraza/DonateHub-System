// src/admin/Components/AdminSidebar.jsx
// import React from 'react';
import { Link } from 'react-router-dom';
import '../admin.css';

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <ul className="sidebar-menu">
        <li>
          <Link to="/admin/dashboard" className="active">
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/users">
            <i className="fas fa-users"></i> Users
          </Link>
        </li>
        <li>
          <Link to="/admin/ngos">
            <i className="fas fa-hands-helping"></i> NGOs
          </Link>
        </li>
        <li>
          <Link to="/admin/donations">
            <i className="fas fa-gift"></i> Donations
          </Link>
        </li>
        <li>
          <Link to="/admin/requests">
            <i className="fas fa-hand-holding"></i> Requests
          </Link>
        </li>
        <li>
          <Link to="/">
            <i className="fas fa-arrow-left"></i> Back to Site
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;