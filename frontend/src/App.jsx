import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import Todos from './components/Todos';
import Register from './components/Register';
import Login from './components/Login';

function App() {
 /*  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authCheck = async () => {
      try {
        const response = await axios.get('/api/auth/verify', { withCredentials: true });
        setIsAuthenticated(response.data.authenticated);
      } catch (error) {
        console.log('Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    authCheck();
  }, []);

  if (loading) {
    return <div>Loading...</div>; */
  

  return (
    <div>
      <Toaster position="top-center" />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={<Todos />} />

        <Route path="/register" element={<Register />} />

        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
