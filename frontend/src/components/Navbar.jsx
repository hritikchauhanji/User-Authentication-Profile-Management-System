import { Link, useNavigate, useLocation } from "react-router-dom";
import { isLoggedIn, removeToken } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  const logout = () => {
    removeToken();
    localStorage.removeItem("role");
    navigate("/login");
  };

  const isAdmin = role === "admin";
  const onAdminDashboard = location.pathname === "/admin/dashboard";

  return (
    <nav className="text-indigo-600 py-4 px-6 shadow flex justify-between items-center">
      <div className="text-lg font-bold">Profile Management System</div>

      <div className="flex space-x-6 items-center">
        {isLoggedIn() ? (
          <>
            {isAdmin ? (
              <>
                {onAdminDashboard ? (
                  <Link
                    to="/profile"
                    className="hover:text-indigo-700 font-medium transition"
                  >
                    Profile
                  </Link>
                ) : (
                  <Link
                    to="/admin/dashboard"
                    className="hover:text-indigo-700 font-medium transition"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </>
            ) : (
              // Normal user: show Profile
              <Link
                to="/profile"
                className="hover:text-indigo-700 font-medium transition"
              >
                Profile
              </Link>
            )}

            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-medium transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium transition"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
