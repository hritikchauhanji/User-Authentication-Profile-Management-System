import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, removeToken } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <nav className="text-indigo-600 py-4 px-6 shadow flex justify-between items-center">
      <div className="text-lg font-bold">AuthApp</div>
      <div className="flex space-x-6 items-center">
        <Link to="/" className="hidden md:block hover:text-gray-300">
          Home
        </Link>
        {isLoggedIn() ? (
          <>
            <Link to="/profile" className="hover:text-gray-300">
              Profile
            </Link>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-medium transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
