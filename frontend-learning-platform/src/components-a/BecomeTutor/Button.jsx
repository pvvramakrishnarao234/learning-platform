// components/Button.jsx
import React from 'react';

const Button = ({ label, primary = false, onClick }) => {
  return (
    <button
      className={`px-6 py-3 rounded-md font-medium transition-all duration-200 transform hover:translate-y-[-2px] hover:shadow-md focus:outline-none active:translate-y-0 ${
        primary 
          ? 'bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;