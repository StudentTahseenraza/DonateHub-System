import { useState, useEffect } from 'react';
import AdminNavbar from '../Components/AdminNavbar';
import AdminSidebar from '../Components/AdminSidebar';
import '../admin.css';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 5;

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const requestTypes = ['Food', 'Clothes', 'Books', 'Furniture', 'Electronics'];
      const statuses = ['Pending', 'Approved', 'Fulfilled', 'Rejected'];
      const urgencyLevels = ['Low', 'Medium', 'High'];
      
      const mockRequests = Array.from({ length: 18 }, (_, i) => ({
        id: i + 1,
        item: `${requestTypes[i % 5]} Request ${i + 1}`,
        requester: `User ${i + 1}`,
        quantity: Math.floor(Math.random() * 10) + 1,
        location: ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata'][i % 4],
        status: statuses[i % 4],
        urgency: urgencyLevels[i % 3],
        date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        ngo: i % 3 === 0 ? `NGO ${Math.floor(i / 3) + 1}` : 'Not assigned'
      }));
      setRequests(mockRequests);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredRequests = requests.filter(request =>
    request.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  const handleStatusChange = (id, newStatus) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: newStatus } : request
    ));
  };

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <div className="admin-content">
        <AdminSidebar />
        <main className="admin-main">
          <h1>Request Management</h1>
          
          <div className="admin-search-container">
            <div className="admin-search-bar">
              <input
                type="text"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-btn">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <div className="filter-options">
              <select>
                <option>All Types</option>
                <option>Food</option>
                <option>Clothes</option>
                <option>Books</option>
                <option>Furniture</option>
                <option>Electronics</option>
              </select>
              <select>
                <option>All Status</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Fulfilled</option>
                <option>Rejected</option>
              </select>
              <select>
                <option>All Urgency</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <i className="fas fa-spinner fa-spin"></i> Loading requests...
            </div>
          ) : (
            <>
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Item</th>
                      <th>Requester</th>
                      <th>Quantity</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Urgency</th>
                      <th>Date</th>
                      <th>NGO</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRequests.map(request => (
                      <tr key={request.id}>
                        <td>{request.id}</td>
                        <td>{request.item}</td>
                        <td>{request.requester}</td>
                        <td>{request.quantity}</td>
                        <td>{request.location}</td>
                        <td>
                          <span className={`status-badge ${request.status.toLowerCase()}`}>
                            {request.status}
                          </span>
                        </td>
                        <td>
                          <span className={`urgency-badge ${request.urgency.toLowerCase()}`}>
                            {request.urgency}
                          </span>
                        </td>
                        <td>{request.date}</td>
                        <td>{request.ngo}</td>
                        <td>
                          <div className="action-buttons">
                            <select
                              value={request.status}
                              onChange={(e) => handleStatusChange(request.id, e.target.value)}
                              className="status-select"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Approved">Approve</option>
                              <option value="Rejected">Reject</option>
                              {request.status === 'Approved' && (
                                <option value="Fulfilled">Mark Fulfilled</option>
                              )}
                            </select>
                            <button className="view-btn">
                              <i className="fas fa-eye"></i> Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredRequests.length === 0 && (
                <div className="no-results">
                  <i className="fas fa-info-circle"></i> No requests found matching your criteria
                </div>
              )}

              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={currentPage === pageNum ? 'active' : ''}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Requests;