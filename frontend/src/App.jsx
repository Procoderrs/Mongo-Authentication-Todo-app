import axios from 'axios'; // Import axios for making HTTP requests
import Profile from './components/Profile'; // Assuming Profile component is used elsewhere
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Use BrowserRouter here
import { Navigate } from 'react-router';
import Login from './components/Login';
import Register from './components/Register';
import Todos from './components/Todos'; // Import Todos component here

//const LOCAL_URL = "http://localhost:5000";

function App() {

  

  return (
    <div>
       <Toaster position="top-center" />
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>
      </Router>
    </div>
  );
}

export default App;
