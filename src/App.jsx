import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import './App.css'
import { ImOpt } from 'react-icons/im';

const App = () => {
  const location = useLocation();
  const showNavbarPaths = ['/', '/hotels', '/flights'];
  const showFooterPaths = ['/', '/hotels', '/flights'];

  return (
    <div className="App">
      {showNavbarPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>

      {showFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default App;
