import { useState } from "react";
import api from "../api/axoisInstance";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spline from "@splinetool/react-spline";

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
    <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 px-4 lg:px-20">
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
            className="w-full bg-indigo-600 text-white py-3 rounded font-semibold hover:scale-105 transition"
          >
            Sign Up
          </button>
          {/* Register Link */}
          <p className="text-center text-sm text-gray-600 mt-2">
            If you have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
      {/* Spline 3D */}
      <div className="w-full lg:w-1/2 h-[300px] sm:h-[400px] md:h-[500px]">
        <Spline scene="https://prod.spline.design/22YQQY0qOql2uS5v/scene.splinecode" />
      </div>
    </div>
  );
}

export default Register;
