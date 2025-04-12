// src/pages/NGODashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NGODashboard.css';

const NGODashboard = () => {
  const [stats, setStats] = useState({
    donations: 0,
    requests: 0,
    volunteers: 0,
    impact: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setStats({
        donations: 24,
        requests: 15,
        volunteers: 8,
        impact: 150
      });
      
      setRecentActivities([
        { id: 1, type: 'donation', item: 'Food Supplies', date: '2 hours ago', status: 'pending' },
        { id: 2, type: 'request', item: 'School Books', date: '5 hours ago', status: 'approved' },
        { id: 3, type: 'volunteer', name: 'Rahul Sharma', date: '1 day ago', status: 'new' },
        { id: 4, type: 'donation', item: 'Winter Clothes', date: '2 days ago', status: 'completed' },
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="ngo-dashboard">
      <div className="dashboard-header">
        <h1>NGO Dashboard</h1>
        <div className="header-actions">
          <Link to="/ngo/profile" className="btn btn-primary">
            Edit Profile
          </Link>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Donations</h3>
          <p>{loading ? '--' : stats.donations}</p>
          <Link to="/ngo/donations">View All</Link>
        </div>
        <div className="stat-card">
          <h3>Active Requests</h3>
          <p>{loading ? '--' : stats.requests}</p>
          <Link to="/ngo/requests">Manage Requests</Link>
        </div>
        <div className="stat-card">
          <h3>Volunteers</h3>
          <p>{loading ? '--' : stats.volunteers}</p>
          <Link to="/ngo/volunteers">See Volunteers</Link>
        </div>
        <div className="stat-card">
          <h3>People Impacted</h3>
          <p>{loading ? '--' : stats.impact}</p>
          <Link to="/ngo/impact">View Impact</Link>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-activities">
          <h2>Recent Activities</h2>
          {loading ? (
            <div className="loading">Loading activities...</div>
          ) : (
            <ul className="activity-list">
              {recentActivities.map(activity => (
                <li key={activity.id} className={`activity-item ${activity.status}`}>
                  <div className="activity-icon">
                    {activity.type === 'donation' && <i className="fas fa-gift"></i>}
                    {activity.type === 'request' && <i className="fas fa-hand-holding-heart"></i>}
                    {activity.type === 'volunteer' && <i className="fas fa-user-plus"></i>}
                  </div>
                  <div className="activity-details">
                    {activity.type === 'donation' && (
                      <p>New donation: <strong>{activity.item}</strong></p>
                    )}
                    {activity.type === 'request' && (
                      <p>New request: <strong>{activity.item}</strong></p>
                    )}
                    {activity.type === 'volunteer' && (
                      <p>New volunteer: <strong>{activity.name}</strong></p>
                    )}
                    <span className="activity-date">{activity.date}</span>
                  </div>
                  <span className={`status-badge ${activity.status}`}>
                    {activity.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <Link to="/ngo/donations/new" className="action-btn">
              <i className="fas fa-plus"></i> Add Donation
            </Link>
            <Link to="/ngo/requests/new" className="action-btn">
              <i className="fas fa-hand-holding-heart"></i> Create Request
            </Link>
            <Link to="/ngo/volunteers/invite" className="action-btn">
              <i className="fas fa-user-plus"></i> Invite Volunteer
            </Link>
            <Link to="/ngo/reports" className="action-btn">
              <i className="fas fa-chart-bar"></i> Generate Report
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;