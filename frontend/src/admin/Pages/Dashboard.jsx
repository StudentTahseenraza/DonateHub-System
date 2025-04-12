// src/admin/Pages/Dashboard.jsx
// import React from 'react';
import AdminNavbar from '../Components/AdminNavbar';
import AdminSidebar from '../Components/AdminSidebar';
import StatsCard from '../Components/StatsCard';
import '../admin.css';

const Dashboard = () => {
  // Sample data - replace with actual data from API
  const stats = [
    { title: 'Total Users', value: 1245, icon: 'fas fa-users', color: 'primary' },
    { title: 'Total NGOs', value: 87, icon: 'fas fa-hands-helping', color: 'success' },
    { title: 'Total Donations', value: 532, icon: 'fas fa-gift', color: 'info' },
    { title: 'Total Requests', value: 389, icon: 'fas fa-hand-holding', color: 'warning' },
  ];

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <div className="admin-content">
        <AdminSidebar />
        <main className="admin-main">
          <h1>Dashboard Overview</h1>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
              />
            ))}
          </div>

          {/* Recent Activities Section */}
          <div className="recent-activities">
            <h2>Recent Activities</h2>
            <div className="activity-list">
              {/* Sample activity items */}
              <div className="activity-item">
                <div className="activity-icon">
                  <i className="fas fa-user-plus"></i>
                </div>
                <div className="activity-details">
                  <p>New user registered - John Doe</p>
                  <small>2 hours ago</small>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">
                  <i className="fas fa-gift"></i>
                </div>
                <div className="activity-details">
                  <p>New donation posted - Furniture</p>
                  <small>5 hours ago</small>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="activity-details">
                  <p>NGO Helping Hands approved</p>
                  <small>1 day ago</small>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;