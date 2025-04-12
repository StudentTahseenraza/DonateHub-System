import { useContext, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { isAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const navigateTo = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/password/forgot",
        { email },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(res.data.message);
      navigateTo("/reset-password"); // Redirect to reset password page
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to send reset link";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#e9f5e9" }}>
      <div className="card p-4 shadow-lg border-0" style={{ width: "450px", borderRadius: "15px" }}>
        <h2 className="text-center mb-4 text-success">Forgot Password</h2>
        <p className="text-center mb-4">Enter your email address to receive a password reset link.</p>
        <form onSubmit={handleForgotPassword}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold text-muted">Email Address</label>
            <input
              type="email"
              className="form-control form-control-lg"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100 btn-lg">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;