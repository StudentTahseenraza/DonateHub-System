import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const navigateTo = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/password/reset",
        { token, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(res.data.message);
      navigateTo("/auth"); // Redirect to login page after reset
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to reset password";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#e9f5e9" }}>
      <div className="card p-4 shadow-lg border-0" style={{ width: "450px", borderRadius: "15px" }}>
        <h2 className="text-center mb-4 text-success">Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label fw-semibold text-muted">New Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="newPassword"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100 btn-lg">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;