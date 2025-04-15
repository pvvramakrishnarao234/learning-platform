import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-white">
      <div className="text-xl font-bold text-blue-600">
        <Link to="/">EduNexum</Link>
      </div>
      <div className="flex items-center space-x-6">
        <Link to="/find-tutor" className="text-gray-700 hover:text-blue-600">
          Find tutor
        </Link>
        <Link to="/become-tutor" className="text-gray-700 hover:text-blue-600">
          Become a tutor
        </Link>
        <Link to="/About" className="text-gray-700 hover:text-blue-600">
          About
        </Link>
        <Link to="/contact" className="text-gray-700 hover:text-blue-600">
          Contact us
        </Link>
        <Link
          to="/dashboard"
          className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition duration-300"
        >
          {user.name} ({user.role})
        </Link>
        <button
          onClick={logout}
          className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
