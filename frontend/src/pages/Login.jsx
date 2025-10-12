import { useState } from "react";
import api from "../api/axoisInstance";
import { setToken } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spline from "@splinetool/react-spline";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      return toast.error("Please fill in all fields");
    }

    try {
      setLoading(true);
      const { data } = await api.post("/login", form);
      setToken(data.token);
      localStorage.setItem("role", data.role);
      toast.success("Login successful!");
      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 px-4 lg:px-20">
      {/* Login Form */}
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2">
        <form
          onSubmit={handleSubmit}
          className="shadow-lg border border-indigo-300 rounded-lg p-8 w-full max-w-md space-y-6 "
        >
          <h2 className="text-3xl font-bold text-center text-indigo-800">
            Sign in
          </h2>

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded border focus:ring-2 focus:ring-indigo-500"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded border focus:ring-2 focus:ring-indigo-500"
            value={form.password}
            onChange={handleChange}
          />

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded font-semibold hover:scale-105 transition disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {/* Register Link */}
          <p className="text-center text-sm text-gray-600 mt-2">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              Register
            </Link>
          </p>
        </form>
      </div>

      {/* Spline 3D */}
      <div className="w-full lg:w-1/2 h-[300px] sm:h-[400px] md:h-[500px]">
        <Spline scene="https://prod.spline.design/ztuKU89lsoZJLOIF/scene.splinecode" />
      </div>
    </div>
  );
}

export default Login;
