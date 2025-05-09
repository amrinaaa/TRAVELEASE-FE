import React from 'react';

const Button = ({ text, bgColor, onClick, disabled = false }) => {
  return (
    <div className={`rounded-3xl ${bgColor} border p-2 w-24 md:w-40 ${disabled ? 'opacity-50' : ''}`}>
      <button 
        className="w-full text-white font-bold text-sm md:text-base" 
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;