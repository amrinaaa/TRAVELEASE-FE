import React from 'react';

const Button = ({ text, bgColor, onClick, disabled = false, icon = null }) => {
  return (
    <button
      className={`flex items-center justify-center rounded-lg ${bgColor} border p-2 px-4 md:px-6 min-w-[120px] md:min-w-[150px] text-white font-bold text-sm md:text-base transition-opacity duration-150 ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;