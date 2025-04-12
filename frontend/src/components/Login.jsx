import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Login form, 2: OTP verification
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      setError("Please enter your email.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/send-otp", {
        email: formData.email,
      });
      setOtp(response.data.otp); // Save OTP for verification
      setStep(2); // Move to OTP verification step
      setError("");
    } catch (err) {
      console.error("Error sending OTP:", err.response?.data || err.message);
      setError("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    if (!userOtp) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        otp,
        userOtp,
      });
      setError("");
      await handleLogin(); // Proceed with login after OTP verification
    } catch (err) {
      console.error("Error verifying OTP:", err.response?.data || err.message);
      setError("Invalid OTP. Please try again.");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token); // Save token to localStorage
      navigate(response.data.role === "admin" ? "/admin" : "/"); // Redirect based on role
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      {step === 1 && (
        <form>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSendOtp}
          >
            Send OTP
          </button>
        </form>
      )}

      {step === 2 && (
        <div>
          <div className="mb-3">
            <label className="form-label">Enter OTP</label>
            <input
              type="text"
              className="form-control"
              value={userOtp}
              onChange={(e) => setUserOtp(e.target.value)}
              required
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleVerifyOtp}
          >
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;