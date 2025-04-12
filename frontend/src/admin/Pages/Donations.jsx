import { useState, useEffect } from 'react';
import AdminNavbar from '../Components/AdminNavbar';
import AdminSidebar from '../Components/AdminSidebar';
import '../admin.css';

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const donationsPerPage = 5;

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const donationTypes = ['Food', 'Clothes', 'Books', 'Furniture', 'Electronics'];
      const statuses = ['Pending', 'Approved', 'Collected', 'Rejected'];
      
      const mockDonations = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        item: `${donationTypes[i % 5]} Donation ${i + 1}`,
        donor: `User ${i + 1}`,
        quantity: Math.floor(Math.random() * 10) + 1,
        location: ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata'][i % 4],
        status: statuses[i % 4],
        date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        ngo: i % 3 === 0 ? `NGO ${Math.floor(i / 3) + 1}` : 'Not assigned'
      }));
      setDonations(mockDonations);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredDonations = donations.filter(donation =>
    donation.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = filteredDonations.slice(indexOfFirstDonation, indexOfLastDonation);
  const totalPages = Math.ceil(filteredDonations.length / donationsPerPage);

  const handleStatusChange = (id, newStatus) => {
    setDonations(donations.map(donation => 
      donation.id === id ? { ...donation, status: newStatus } : donation
    ));
  };

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <div className="admin-content">
        <AdminSidebar />
        <main className="admin-main">
          <h1>Donation Management</h1>
          
          <div className="admin-search-container">
            <div className="admin-search-bar">
              <input
                type="text"
                placeholder="Search donations..."
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
                <option>Collected</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <i className="fas fa-spinner fa-spin"></i> Loading donations...
            </div>
          ) : (
            <>
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Item</th>
                      <th>Donor</th>
                      <th>Quantity</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>NGO</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentDonations.map(donation => (
                      <tr key={donation.id}>
                        <td>{donation.id}</td>
                        <td>{donation.item}</td>
                        <td>{donation.donor}</td>
                        <td>{donation.quantity}</td>
                        <td>{donation.location}</td>
                        <td>
                          <span className={`status-badge ${donation.status.toLowerCase()}`}>
                            {donation.status}
                          </span>
                        </td>
                        <td>{donation.date}</td>
                        <td>{donation.ngo}</td>
                        <td>
                          <div className="action-buttons">
                            {donation.status !== 'Collected' && (
                              <select
                                value={donation.status}
                                onChange={(e) => handleStatusChange(donation.id, e.target.value)}
                                className="status-select"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approve</option>
                                <option value="Rejected">Reject</option>
                                {donation.status === 'Approved' && (
                                  <option value="Collected">Mark Collected</option>
                                )}
                              </select>
                            )}
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

              {filteredDonations.length === 0 && (
                <div className="no-results">
                  <i className="fas fa-info-circle"></i> No donations found matching your criteria
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

export default Donations;