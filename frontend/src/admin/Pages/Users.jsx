// src/admin/Pages/Users.jsx
import { useState, useEffect } from 'react';
import AdminNavbar from '../Components/AdminNavbar';
import AdminSidebar from '../Components/AdminSidebar';
import '../admin.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Donor', status: 'Active', joinDate: '2023-01-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Receiver', status: 'Active', joinDate: '2023-02-20' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Donor', status: 'Inactive', joinDate: '2023-03-10' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Receiver', status: 'Active', joinDate: '2023-04-05' },
      ];
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
        : user
    ));
  };

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <div className="admin-content">
        <AdminSidebar />
        <main className="admin-main">
          <h1>User Management</h1>
          
          <div className="admin-search-bar">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <i className="fas fa-spinner fa-spin"></i> Loading users...
            </div>
          ) : (
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Join Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <span className={`status-badge ${user.status.toLowerCase()}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>{user.joinDate}</td>
                      <td>
                        <button
                          className={`status-btn ${user.status === 'Active' ? 'deactivate' : 'activate'}`}
                          onClick={() => toggleUserStatus(user.id)}
                        >
                          {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button className="view-btn">
                          <i className="fas fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Users;