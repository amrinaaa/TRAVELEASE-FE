// src/components/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'text-indigo-600', textColor = 'text-gray-700', message }) => {
  const sizeClasses = {
    sm: 'h-5 w-5 border-2', // Sedikit lebih kecil, border lebih tipis untuk ukuran kecil
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={`animate-spin rounded-full ${sizeClasses[size]} ${color} border-t-transparent border-b-transparent`}
        style={{ borderTopColor: 'currentColor', borderBottomColor: 'currentColor' }} // Menggunakan currentColor agar warna border konsisten dengan properti color
      >
      </div>
      {message && <p className={`mt-2 text-sm ${textColor}`}>{message}</p>}
    </div>
  );
};

export default LoadingSpinner;