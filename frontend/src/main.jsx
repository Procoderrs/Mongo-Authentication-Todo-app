import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todos from './components/Todos'
import Register from './components/Register';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx'

const root = document.getElementById("root");
createRoot(root).render(
  <StrictMode>
    <Toaster position='top-center'/>  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
