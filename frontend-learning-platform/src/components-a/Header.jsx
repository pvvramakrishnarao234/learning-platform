import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-white">
      <div className="text-xl font-bold text-blue-600">
        <Link to="/">EduNexum</Link>
      </div>
      <div className="flex items-center space-x-6">
        <Link to="/find-tutor" className="text-gray-700 hover:text-blue-600">Find tutor</Link>
        <Link to="/become-tutor" className="text-gray-700 hover:text-blue-600">Become a tutor</Link>
        <Link to="/About" className="text-gray-700 hover:text-blue-600">About</Link>
        <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact us</Link>
        <Link to="/signin" className="text-gray-700 hover:text-blue-600">Login</Link>
        <Link to="/signup-student" className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">Sign up</Link>
      </div>
    </nav>
  );
};

export default Header;