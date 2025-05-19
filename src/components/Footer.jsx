import React from 'react'
import { Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-ungu4 to-ungu5 text-white px-6 md:px-20 py-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Logo & Deskripsi */}
        <div>
          <img
            src="/src/assets/img/Logo-w.png"
            alt="TravelEase Logo"
            className="h-12 mb-4"
          />
          <p className="text-sm text-justify">
            TravelEase memudahkan perjalananmu dengan layanan pemesanan tiket dan hotel yang cepat dan praktis.
          </p>
        </div>

        {/* Kontak */}
        <div>
          <h2 className="font-semibold mb-2 text-lg">Hubungi Kami</h2>
          <div className="flex items-center space-x-2 text-sm mb-1">
            <Mail className="w-4 h-4 text-ungu1" />
            <span>travelease@gmail.com</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="w-4 h-4 text-ungu1" />
            <span>+1 386-688-3295</span>
          </div>
        </div>

        {/* Link Navigasi */}
        <div>
          <h2 className="font-semibold mb-2 text-lg">Navigasi</h2>
          <ul className="text-sm space-y-1">
            <li><a href="#" className="hover:underline">Beranda</a></li>
            <li><a href="#" className="hover:underline">Tiket</a></li>
            <li><a href="#" className="hover:underline">Hotel</a></li>
            <li><a href="#" className="hover:underline">Kontak</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-white/30 pt-4 text-center text-sm text-white">
        © 2025 TravelEase. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer
