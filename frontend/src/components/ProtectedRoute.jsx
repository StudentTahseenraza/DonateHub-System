// ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Context } from "../main";

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(Context);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to /auth while remembering where they came from
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;