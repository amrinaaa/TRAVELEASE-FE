import React from "react";
import { Mail, Phone, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full text-white bg-ungu5 shadow-lg border-t border-white/20">
      <section className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Info */}
        <div className="space-y-4">
          <img src="/src/assets/img/Logo.png" alt="logo-footer" className="h-14" />
          <p className="text-sm text-gray-200">
            Transforming travel experiences with ease. Your journey starts here!
          </p>
          <p className="text-sm">
            Want to join as a partner? <a href="#" className="font-bold text-ungu1">Contact Us.</a>
          </p>
          <div className="flex flex-col space-y-2">
            <p className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-ungu1" />
              <span>travelease@gmail.com</span>
            </p>
            <p className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-ungu1" />
              <span>+1 386-688-3295</span>
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { header: "About Us", links: ["Company", "Team", "Careers", "Contact"] },
            { header: "Services", links: ["Hotels", "Flights", "Car Rentals", "Tours"] },
            { header: "Destinations", links: ["Asia", "Europe", "America", "Africa"] },
          ].map((section, index) => (
            <div key={index} className="text-left md:text-center">
              <h1 className="font-bold text-lg text-white/80">{section.header}</h1>
              <ul className="mt-3 space-y-2 text-sm text-gray-300">
                {section.links.map((link, idx) => (
                  <li key={idx}><a href="#" className="hover:text-white">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media */}
        <div className="flex flex-col md:items-end space-y-4">
          <h1 className="font-bold text-lg text-white/80">Follow Us</h1>
          <div className="flex space-x-4">
            {[Facebook, Twitter, Instagram].map((Icon, index) => (
              <a key={index} href="#" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition">
                <Icon className="w-5 h-5 text-white" />
              </a>
            ))}
          </div>
        </div>
      </section>
      
      {/* Copyright Section */}
      <section className="bg-ungu9 py-3 text-center text-sm text-gray-300">
        <p>Copyright © 2025 - TravelEase. All rights reserved.</p>
      </section>
    </footer>
  );
};

export default Footer;