import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, token, setIsAuthenticated, setUser, setToken } = useContext(Context);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData({
          name: res.data.user.name,
          email: res.data.user.email,
          phone: res.data.user.phone,
        });
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch user data");
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    if (user && token) {
      fetchUserData();
    } else {
      navigate("/auth"); // Redirect to login if not authenticated
    }
  }, [user, token, navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission for profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:5000/api/v1/user/me/update",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Profile updated successfully");
      setUser(res.data.user); // Update context with new user data
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Error updating profile:", error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container-fluid py-5"
      style={{
        background: "linear-gradient(135deg, #e9f5e9, #d4edda)",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <div
          className="card shadow-lg border-0 mx-auto"
          style={{
            maxWidth: "600px",
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(31, 38, 135, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          {/* Profile Header */}
          <div className="card-body p-4">
            <div className="text-center mb-4">
              <div
                className="rounded-circle mx-auto bg-success d-flex align-items-center justify-content-center"
                style={{
                  width: "100px",
                  height: "100px",
                  overflow: "hidden",
                  border: "3px solid #28a745",
                }}
              >
                <span className="text-white fw-bold" style={{ fontSize: "2.5rem" }}>
                  {formData.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="mt-3 fw-bold" style={{ color: "#28a745" }}>
                {formData.name}
              </h2>
              <p className="text-muted">Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>

            {/* Profile Details */}
            {!isEditing ? (
              <div className="mb-4">
                <h4 className="fw-semibold" style={{ color: "#495057" }}>
                  Profile Details
                </h4>
                <div className="list-group list-group-flush">
                  <div className="list-group-item bg-transparent border-0 py-3">
                    <strong style={{ color: "#28a745" }}>Email:</strong> {formData.email}
                  </div>
                  <div className="list-group-item bg-transparent border-0 py-3">
                    <strong style={{ color: "#28a745" }}>Phone:</strong> {formData.phone}
                  </div>
                </div>
                <button
                  className="btn btn-outline-success w-100 mt-3"
                  onClick={() => setIsEditing(true)}
                  style={{ borderRadius: "10px", fontWeight: "600" }}
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              /* Edit Profile Form */
              <form onSubmit={handleSubmit} className="mb-4">
                <h4 className="fw-semibold mb-3" style={{ color: "#495057" }}>
                  Edit Profile
                </h4>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold" style={{ color: "#495057" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      borderRadius: "10px",
                      background: "rgba(255, 255, 255, 0.5)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      backdropFilter: "blur(5px)",
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold" style={{ color: "#495057" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      borderRadius: "10px",
                      background: "rgba(255, 255, 255, 0.5)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      backdropFilter: "blur(5px)",
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label fw-semibold" style={{ color: "#495057" }}>
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    style={{
                      borderRadius: "10px",
                      background: "rgba(255, 255, 255, 0.5)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      backdropFilter: "blur(5px)",
                    }}
                  />
                </div>
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn w-50"
                    style={{
                      backgroundColor: "#28a745",
                      color: "#fff",
                      borderRadius: "10px",
                      fontWeight: "600",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-50"
                    onClick={() => setIsEditing(false)}
                    style={{ borderRadius: "10px", fontWeight: "600" }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Additional Actions */}
            <div className="text-center">
              <button
                className="btn btn-danger w-100"
                onClick={handleLogout}
                style={{
                  borderRadius: "10px",
                  fontWeight: "600",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#c82333")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;