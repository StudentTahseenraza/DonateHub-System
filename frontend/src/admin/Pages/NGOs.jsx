import { useState, useEffect } from 'react';
import AdminNavbar from '../Components/AdminNavbar';
import AdminSidebar from '../Components/AdminSidebar';
import '../admin.css';

const NGOs = () => {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ngosPerPage = 5;

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockNGOs = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        name: `NGO ${i + 1}`,
        email: `ngo${i + 1}@example.com`,
        location: ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata'][i % 4],
        status: ['Pending', 'Approved', 'Rejected'][i % 3],
        rating: (Math.random() * 5).toFixed(1),
        joinDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
      }));
      setNgos(mockNGOs);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredNGOs = ngos.filter(ngo =>
    ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ngo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ngo.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastNGO = currentPage * ngosPerPage;
  const indexOfFirstNGO = indexOfLastNGO - ngosPerPage;
  const currentNGOs = filteredNGOs.slice(indexOfFirstNGO, indexOfLastNGO);
  const totalPages = Math.ceil(filteredNGOs.length / ngosPerPage);

  const handleStatusChange = (id, newStatus) => {
    setNgos(ngos.map(ngo => 
      ngo.id === id ? { ...ngo, status: newStatus } : ngo
    ));
  };

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <div className="admin-content">
        <AdminSidebar />
        <main className="admin-main">
          <h1>NGO Management</h1>
          
          <div className="admin-search-container">
            <div className="admin-search-bar">
              <input
                type="text"
                placeholder="Search NGOs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-btn">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <div className="filter-options">
              <select>
                <option>All Status</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
              <select>
                <option>Sort By</option>
                <option>Newest First</option>
                <option>Oldest First</option>
                <option>Highest Rated</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <i className="fas fa-spinner fa-spin"></i> Loading NGOs...
            </div>
          ) : (
            <>
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Location</th>
                      <th>Rating</th>
                      <th>Status</th>
                      <th>Join Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentNGOs.map(ngo => (
                      <tr key={ngo.id}>
                        <td>{ngo.id}</td>
                        <td>{ngo.name}</td>
                        <td>{ngo.email}</td>
                        <td>{ngo.location}</td>
                        <td>
                          <span className="rating-badge">
                            {ngo.rating} <i className="fas fa-star"></i>
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${ngo.status.toLowerCase()}`}>
                            {ngo.status}
                          </span>
                        </td>
                        <td>{ngo.joinDate}</td>
                        <td>
                          <div className="action-buttons">
                            {ngo.status === 'Pending' && (
                              <>
                                <button 
                                  className="approve-btn"
                                  onClick={() => handleStatusChange(ngo.id, 'Approved')}
                                >
                                  Approve
                                </button>
                                <button 
                                  className="reject-btn"
                                  onClick={() => handleStatusChange(ngo.id, 'Rejected')}
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            <button className="view-btn">
                              <i className="fas fa-eye"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredNGOs.length === 0 && (
                <div className="no-results">
                  <i className="fas fa-info-circle"></i> No NGOs found matching your criteria
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

export default NGOs;