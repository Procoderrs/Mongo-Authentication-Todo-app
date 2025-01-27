import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Todos from "./components/Todos";
import Register from "./components/Register";
import Login from "./components/Login";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkPersistedLogin = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/user/verify`, { withCredentials: true });
        setUser(response.data);
      } catch {
        console.log("Not logged in");
        setUser(null);
      }
    };
    checkPersistedLogin();
  }, []);

  return (
    <div>
      <Toaster position="top-center" />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={user ? "/todos" : "/login"} />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/todos" />} />
          <Route path="/todos" element={user ? <Todos user={user} /> : <Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
