import React from 'react';

const Button = ({ text, bgColor, onClick }) => {
  return (
    <div className={`rounded-3xl ${bgColor} border p-2 w-20 md:w-24`}>
      <button className="w-full text-white font-bold text-sm md:text-base" onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default Button