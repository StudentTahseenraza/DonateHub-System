// src/admin/Pages/AuditLog.jsx
import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import AdminNavbar from '../Components/AdminNavbar';
import AdminSidebar from '../Components/AdminSidebar';
import '../admin.css';

const AuditLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });
  const [filters, setFilters] = useState({
    action: '',
    admin: '',
    dateFrom: '',
    dateTo: ''
  });

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters
      };
      const response = await adminAPI.get('/admin/audit', { params });
      setLogs(response.data.logs);
      setPagination({
        ...pagination,
        total: response.data.total
      });
    } catch (error) {
      console.error('Error fetching audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [pagination.page, filters]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getActionColor = (action) => {
    switch(action.toLowerCase()) {
      case 'create': return 'success';
      case 'update': return 'info';
      case 'delete': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <div className="admin-content">
        <AdminSidebar />
        <main className="admin-main">
          <h1>Audit Logs</h1>
          
          <div className="audit-filters">
            <select 
              name="action" 
              value={filters.action}
              onChange={(e) => setFilters({...filters, action: e.target.value})}
            >
              <option value="">All Actions</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
              <option value="login">Login</option>
            </select>
            
            <input
              type="text"
              placeholder="Admin name or ID"
              value={filters.admin}
              onChange={(e) => setFilters({...filters, admin: e.target.value})}
            />
            
            <div className="date-range">
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
              />
              <span>to</span>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
              />
            </div>
            
            <button onClick={() => fetchLogs()}>Apply Filters</button>
          </div>
          
          <div className="audit-log-container">
            {loading ? (
              <div className="loading">Loading logs...</div>
            ) : (
              <table className="audit-log-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Admin</th>
                    <th>Action</th>
                    <th>Entity</th>
                    <th>Details</th>
                    <th>IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map(log => (
                    <tr key={log._id}>
                      <td>{formatDate(log.timestamp)}</td>
                      <td>{log.adminName || log.adminId}</td>
                      <td>
                        <span className={`action-badge ${getActionColor(log.action)}`}>
                          {log.action}
                        </span>
                      </td>
                      <td>{log.entityType}</td>
                      <td className="log-details">{log.details}</td>
                      <td>{log.ipAddress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
          {pagination.total > pagination.limit && (
            <div className="pagination">
              <button 
                onClick={() => setPagination({...pagination, page: pagination.page - 1})}
                disabled={pagination.page === 1}
              >
                Previous
              </button>
              <span>Page {pagination.page} of {Math.ceil(pagination.total / pagination.limit)}</span>
              <button 
                onClick={() => setPagination({...pagination, page: pagination.page + 1})}
                disabled={pagination.page * pagination.limit >= pagination.total}
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AuditLog;