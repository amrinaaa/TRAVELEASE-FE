import React from "react";

const Searchbar = ({ forWhat, onSearch }) => {
  return (
    <input
      type="text"
      placeholder={`Cari ${forWhat}...`}
      className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4 py-2 md:py-1 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-ungu4 placeholder:font-bold focus:placeholder:text-black"
      onChange={(e) => onSearch(e.target.value)} 
    />
  );
};

export default Searchbar;
