import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isNGODropdownOpen, setNGODropdownOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin token exists in local storage
    const adminToken = localStorage.getItem("adminToken");
    setIsAdmin(!!adminToken);
  }, []);

  const toggleNGODropdown = () => {
    setNGODropdownOpen(!isNGODropdownOpen);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-darkturquoise shadow-sm"
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}
    >
      <div className="container-fluid">
        <nav className="navbar d-flex justify-content-start px-5">
          <h2 className="navbar-brand fw-bold ms-5 text-white" to="/">
           Unused<strong >2</strong>Useful
          </h2>
        </nav>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mission">
                Mission
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/donate">
                Donate
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/request">
                Request
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/leaderboard">
                Leaderboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/rewards">
                Rewards
              </Link>
            </li>

            {/* NGO Dropdown */}
            <li
              className="nav-item dropdown"
              onMouseEnter={toggleNGODropdown}
              onMouseLeave={toggleNGODropdown}
            >
              <span className="nav-link dropdown-toggle" role="button">
                NGOs
              </span>
              {isNGODropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/ngo/register">
                      Register NGO
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/ngo/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/ngo/search">
                      Search NGOs
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/ngo/top-rated">
                      Top-Rated NGOs
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {isAdmin ? (
              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle" role="button">
                  Admin Panel
                </span>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/admin/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/users">
                      Users
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/ngos">
                      NGOs
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/donations">
                      Donations
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/requests">
                      Requests
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/roles">
                      Roles
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/auditlog">
                      AuditLog
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        localStorage.removeItem("adminToken");
                        setIsAdmin(false);
                        navigate("/");
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/admin/login">
                  Admin Login
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/auth">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
