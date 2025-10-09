import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, removeToken } from "../utils/auth";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import api from "../api/axoisInstance";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      if (isLoggedIn()) {
        try {
          const res = await api.get("/profile");
          setUser(res.data);
        } catch (error) {
          toast.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    removeToken();
    toast.success("Logout successful!");
    navigate("/login");
  };

  return (
    <nav className="text-white py-4 px-6 shadow flex justify-between items-center">
      <div className="text-lg font-bold text-indigo-600">
        {user ? user.name : "AuthApp"}
      </div>
      <div className="flex space-x-6 items-center">
        {isLoggedIn() ? (
          <>
            <Link
              to="/profile"
              className="hover:text-indigo-700 text-indigo-600 font-semibold"
            >
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
            <Link
              to="/login"
              className="hover:text-indigo-700 text-indigo-600 font-semibold"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white font-medium transition"
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
