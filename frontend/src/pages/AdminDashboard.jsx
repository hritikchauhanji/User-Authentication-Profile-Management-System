import { useEffect, useState } from "react";
import api from "../api/axoisInstance";
import { toast } from "react-toastify";

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  // Fetch all users (except admins)
  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/admin/users");
      setUsers(data.users);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch users");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`);
      toast.success("User deleted successfully!");
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [handleDelete]);

  return (
    <div className="min-h-screen p-6 ">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
        Admin Dashboard
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-xl">
        <table className="min-w-full border-collapse">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Profile
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-indigo-50 transition"
                >
                  <td className="px-6 py-3">
                    <img
                      src={
                        user.profileImage ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.name || "User"
                        )}&background=8600e9&bold=true&color=fff`
                      }
                      alt="profile"
                      className="w-12 h-12 rounded-full object-cover border-2 border-indigo-300"
                    />
                  </td>
                  <td className="px-6 py-3">{user.name}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-gray-600 py-6 text-lg"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
