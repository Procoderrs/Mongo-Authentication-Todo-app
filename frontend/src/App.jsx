import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Todos from './components/Todos';
import Register from './components/Register';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';

// Main App Component
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // State for authentication check
  const navigate = useNavigate();  // Hook for navigation

  useEffect(() => {
    // Check if 'access_token' exists in cookies
    const token = document.cookie.split('; ').find(row => row.startsWith('access_token='));
    if (token) {
      setIsAuthenticated(true);  // User is authenticated
    } else {
      setIsAuthenticated(false);  // User is not authenticated
      navigate('/login');  // Redirect to login page
    }
  }, []);

  return (
    <div>
      <h1>Click me</h1>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todos" element={isAuthenticated ? <Todos /> : <Login />} /> {/* Protected Route */}
      </Routes>
    </div>
  );
}