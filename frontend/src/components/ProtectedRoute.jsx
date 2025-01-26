import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/auth/validate", {
          withCredentials: true, // Include cookies
        });

        if (response.data.authenticated) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loader while checking authentication
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
