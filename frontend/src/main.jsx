import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todos from './components/Todos'
import Register from './components/Register';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';
//import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component


const root = document.getElementById("root");

createRoot(root).render(
  <StrictMode>
    <Toaster position="top-center" />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>

       
);
