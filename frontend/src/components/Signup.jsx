import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
  });
  const [otp, setOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Signup form, 2: OTP verification
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
      await handleSignup(); // Proceed with signup after OTP verification
    } catch (err) {
      console.error("Error verifying OTP:", err.response?.data || err.message);
      setError("Invalid OTP. Please try again.");
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", formData);
      console.log("Signup successful:", response.data);
      navigate("/login"); // Redirect to login page after signup
    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      {step === 1 && (
        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
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

export default Signup;