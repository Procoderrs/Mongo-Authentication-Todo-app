import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import Todos from './components/Todos'
import Register from './components/Register';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';

const root = document.getElementById("root");
createRoot(root).render(
  <StrictMode>
    <Toaster position='top-center'/>  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
