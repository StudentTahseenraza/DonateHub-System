// src/admin/Components/DashboardAnalytics.jsx
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const DashboardAnalytics = ({ stats }) => {
  // Activity chart data
  const activityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Donations',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: '#4e73df',
      },
      {
        label: 'Requests',
        data: [8, 15, 7, 12, 6, 9],
        backgroundColor: '#1cc88a',
      },
    ],
  };

  // NGO distribution data
  const ngoDistributionData = {
    labels: ['Education', 'Health', 'Environment', 'Animals', 'Poverty'],
    datasets: [
      {
        data: [15, 20, 10, 8, 12],
        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'],
      },
    ],
  };

  return (
    <div className="analytics-grid">
      <div className="chart-card">
        <h3>Monthly Activity</h3>
        <div className="chart-container">
          <Bar 
            data={activityData}
            options={{
              responsive: true,
              scales: {
                x: { stacked: true },
                y: { stacked: true }
              }
            }}
          />
        </div>
      </div>
      
      <div className="chart-card">
        <h3>NGO Categories</h3>
        <div className="chart-container">
          <Pie 
            data={ngoDistributionData}
            options={{ responsive: true }}
          />
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card primary">
          <h4>Total Users</h4>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-card success">
          <h4>Active NGOs</h4>
          <p>{stats.activeNGOs}</p>
        </div>
        <div className="stat-card info">
          <h4>Pending Donations</h4>
          <p>{stats.pendingDonations}</p>
        </div>
        <div className="stat-card warning">
          <h4>Urgent Requests</h4>
          <p>{stats.urgentRequests}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;