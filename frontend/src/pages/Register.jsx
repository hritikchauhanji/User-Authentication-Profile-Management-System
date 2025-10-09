import { useState } from "react";
import api from "../api/axoisInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", form);
      toast.success("Registered successfully. Please login!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="flex flex-col  items-center justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="shadow-lg rounded-lg border border-indigo-300 p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-800">
          Sign up
        </h2>
        <input
          name="name"
          placeholder="Name"
          className="w-full px-4 py-3 rounded border focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
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
          className="w-full bg-indigo-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Register;
