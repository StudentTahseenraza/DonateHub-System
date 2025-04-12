// Login.jsx
import { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setIsAuthenticated, setUser, setToken } = useContext(Context);
  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    console.log("Sending login data:", data);
    try {
      const res = await axios.post("http://localhost:5000/api/v1/user/login", data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      console.log("Login successful:", res.data);
      toast.success(res.data.message);
      setIsAuthenticated(true);
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      navigateTo("/donate", { replace: true });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed, please try again";
      console.error("Login error:", error.response || error);
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <h2 className="text-center mb-4 fw-bold" style={{ color: "#fff" }}>
        Welcome Back
      </h2>
      <div className="mb-3">
        <label htmlFor="email" className="form-label fw-semibold" style={{ color: "rgb(7, 6, 6)" }}>
          Email 
        </label>
        <input
          type="email"
          className="form-control form-control-lg"
          id="email"
          placeholder="Enter your email"
          {...register("email", { required: true })}
          style={{
            borderRadius: "10px",
            background: "rgba(255, 255, 255, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(5px)",
            color: "#fff",
          }}
        />
        {errors.email && <span className="text-warning mt-1 d-block">Email is required</span>}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label fw-semibold" style={{ color: "rgba(17, 15, 15, 0.95)" }}>
          Password
        </label>
        <input
          type="password"
          className="form-control form-control-lg"
          id="password"
          placeholder="Enter your password"
          {...register("password", { required: true })}
          style={{
            borderRadius: "10px",
            background: "rgba(255, 255, 255, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(5px)",
            color: "#fff",
          }}
        />
        {errors.password && <span className="text-warning mt-1 d-block">Password is required</span>}
      </div>
      <div className="mb-3 text-end">
        <a
          href="/forgot-password"
          className="text-decoration-none fw-semibold"
          style={{ color: "rgba(66, 95, 240, 0.95)", fontSize: "0.9rem" }}
        >
          Forgot Password?
        </a>
      </div>
      <button
        type="submit"
        className="btn w-100 btn-lg"
        style={{
          backgroundColor: "rgba(96, 208, 223, 0.8)",
          color: "#fff",
          borderRadius: "10px",
          fontWeight: "600",
          transition: "background-color 0.3s ease",
          border: "none",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "rgba(59, 195, 223, 0.9)")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "rgba(57, 48, 191, 0.8)")}
      >
        Login
      </button>
    </form>
  );
};

export default Login;