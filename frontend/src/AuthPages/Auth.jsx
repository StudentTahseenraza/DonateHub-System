// Auth.jsx
import { useContext, useState, useEffect } from "react";
import { Context } from "../main";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
  const { isAuthenticated } = useContext(Context);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // This will set the form to login when coming from Register page
    if (location.state?.showLogin !== undefined) {
      setIsLogin(location.state.showLogin);
    }
  
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "url('https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80') center/cover no-repeat",
      }}
    >
      <div
        className="card p-4 shadow-lg border-0"
        style={{
          // paddingTop: "100px",
          // minHeight: "100px",
          maxWidth: "500px",
          width: "450px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
        }}
      >
        {/* <h1 className="text-center mb-4 fw-bold" style={{ color: "#fff", textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          WasteWise
        </h1> */}
        <div className="d-flex justify-content-center gap-3 mb-4">
          <button
            className={`btn btn-lg ${isLogin ? "btn-primary" : "btn-outline-light"}`}
            onClick={() => setIsLogin(true)}
            style={{
              borderRadius: "10px",
              padding: "10px 20px",
              fontWeight: "600",
              transition: "all 0.3s ease",
              border: isLogin ? "none" : "1px solid rgba(255,255,255,0.3)",
              color: isLogin ? "#fff" : "rgba(255,255,255,0.8)",
            }}
          >
            Login
          </button>
          <button
            className={`btn btn-lg ${!isLogin ? "btn-primary" : "btn-outline-light"}`}
            onClick={() => setIsLogin(false)}
            style={{
              borderRadius: "10px",
              padding: "10px 20px",
              fontWeight: "600",
              transition: "all 0.3s ease",
              border: !isLogin ? "none" : "1px solid rgba(37, 85, 181, 0.3)",
              color: !isLogin ? "#fff" : "rgba(56, 107, 203, 0.8)",
            }}
          >
            Register
          </button>
        </div>
        <div className="p-2">{isLogin ? <Login /> : <Register />}</div>
      </div>
    </div>
  );
};

export default Auth;