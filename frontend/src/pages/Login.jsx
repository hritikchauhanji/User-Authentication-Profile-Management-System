import { useState } from "react";
import api from "../api/axoisInstance";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/login", form);
      setToken(data.token);
      toast.success("Login successful!");
      navigate("/profile");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-800">
          Sign in
        </h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded border focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded border focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded font-semibold hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
