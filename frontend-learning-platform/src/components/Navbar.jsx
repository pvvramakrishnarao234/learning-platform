import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-white text-2xl font-bold">
          LearnSphere
        </NavLink>
        <div className="space-x-4 flex items-center">
          <NavLink to="/" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md transition duration-300">
            Home
          </NavLink>
          <NavLink to="/about" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md transition duration-300">
            About Us
          </NavLink>
          <NavLink to="/contact" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md transition duration-300">
            Contact Us
          </NavLink>
          {user ? (
            <>
              <NavLink
                to="/profile-settings"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md transition duration-300"
              >
                {user.name} ({user.role})
              </NavLink>
              <button
                onClick={logout}
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/signin"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md transition duration-300"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup/student"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md transition duration-300"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;