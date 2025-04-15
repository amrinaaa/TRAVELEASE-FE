import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Sidebar from './components/Sidebar';
import NavSidebar from './components/NavSidebar';
import DashboardAdmin from './pages/DashboardAdmin';
import ManajemenPengguna from './pages/ManajemenPengguna';
import TambahPengguna from './pages/TambahPengguna';
import EditPengguna from './pages/EditPengguna';
import ManajemenMitra from './pages/ManajemenMitra';
import TambahMitra from './pages/TambahMitra';
import DashboardMitraHotel from './pages/DashboardMitraHotel';
import ManajemenHotel from './pages/ManajemenHotel';
import DashboardMitraPesawat from './pages/DashboardMitraPesawat';
import ManajemenPesawat from './pages/ManajemenPesawat';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import './App.css';

const App = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);

  // Ambil data user dari localStorage (opsional)
  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem('user'));
  //   if (storedUser) {
  //     setUser(storedUser);
  //   }
  // }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const showNavbar = ['/', '/hotels', '/flights'].includes(location.pathname);
  const showFooter = ['/', '/hotels', '/flights'].includes(location.pathname);

  let role = null;
  if (['/admin', '/manajemen-pengguna', '/tambah-pengguna', '/edit-pengguna','/manajemen-mitra', '/tambah-mitra'].includes(location.pathname)) {
    role = 'admin';
  } else if (['/mitra-hotel', '/manajemen-hotel'].includes(location.pathname)) {
    role = 'mitra-hotel';
  } else if (['/mitra-pesawat', '/manajemen-pesawat'].includes(location.pathname)) {
    role = 'mitra-pesawat';
  }

  return (
    <div className="App">
      {showNavbar && <Navbar />}
      
      {role && <Sidebar isOpen={isSidebarOpen} role={role} />}
      {role && <NavSidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} user={user} />}

      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Guest/User Routes */}
        <Route path="/" element={<Home />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<DashboardAdmin isSidebarOpen={isSidebarOpen} />} />
        <Route path="/manajemen-pengguna" element={<ManajemenPengguna isSidebarOpen={isSidebarOpen} />} />
        <Route path="/tambah-pengguna" element={<TambahPengguna isSidebarOpen={isSidebarOpen} />} />
        <Route path="/edit-pengguna" element={<EditPengguna isSidebarOpen={isSidebarOpen} />} />
        <Route path="/manajemen-mitra" element={<ManajemenMitra isSidebarOpen={isSidebarOpen} />} />
        <Route path="/tambah-mitra" element={<TambahMitra isSidebarOpen={isSidebarOpen} />} />

        {/* Mitra Routes */}
        <Route path="/mitra-hotel" element={<DashboardMitraHotel isSidebarOpen={isSidebarOpen} />} />
        <Route path="/manajemen-hotel" element={<ManajemenHotel isSidebarOpen={isSidebarOpen} />} />

        <Route path="/mitra-pesawat" element={<DashboardMitraPesawat isSidebarOpen={isSidebarOpen} />} />
        <Route path="/manajemen-pesawat" element={<ManajemenPesawat isSidebarOpen={isSidebarOpen} />} />  
      </Routes>

      {showFooter && <Footer />}
    </div>
  );
};

export default App;
