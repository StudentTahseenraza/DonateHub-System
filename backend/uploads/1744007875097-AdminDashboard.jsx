import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [donation, setDonation] = useState([]);
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donationsRes = await axios.get('http://localhost:5000/api/donationn', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const requestsRes = await axios.get('http://localhost:5000/api/request', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const usersRes = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setDonation(donationsRes.data);
        setRequests(requestsRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <div className="row">
        <div className="col-md-4">
          <h3>Donations</h3>
          <ul className="list-group">
            {donation.map((donation) => (
              <li key={donation._id} className="list-group-item">
                {donation.itemName} - {donation.donorId.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-4">
          <h3>Requests</h3>
          <ul className="list-group">
            {requests.map((request) => (
              <li key={request._id} className="list-group-item">
                {request.itemName} - {request.receiverId.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-4">
          <h3>Users</h3>
          <ul className="list-group">
            {users.map((user) => (
              <li key={user._id} className="list-group-item">
                {user.name} - {user.email}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;