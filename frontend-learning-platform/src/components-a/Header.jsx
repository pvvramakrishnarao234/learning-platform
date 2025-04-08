import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-900">EduNexum</div>
      <nav className="flex space-x-6">
        <a href="#find-tutor" className="text-blue-600 hover:text-blue-800">Find Tutor</a>
        <a href="#become-tutor" className="text-blue-600 hover:text-blue-800">Become a Tutor</a>
        <a href="#contact" className="text-blue-600 hover:text-blue-800">Contact</a>
        <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
          Login
        </button>
      </nav>
    </header>
  );
};

export default Header;