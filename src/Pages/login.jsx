import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/login.jpg";
import { toast } from "react-toastify";
import { loginUser } from "../services/authServices";

export default function Login({ setToken }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) return;

    setLoading(true);
    try {
      const res = await loginUser({ email, password });
      toast.success("Login Successful!");
      navigate("/home");
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <div className="w-full md:w-1/2 flex flex-col justify-center px-10 py-10">
        <h1 className="text-3xl font-bold text-gray-900 uppercase mb-2">
          WELCOME BACK
        </h1>
        <p className="text-gray-500 mb-6">
          Welcome back! Please enter your details.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() => navigate("/forget-password")}
              className="text-blue-600 text-sm hover:underline"
            >
              Forget Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 py-2 rounded-md text-white transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-blue-700"
            }`}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                ></path>
              </svg>
            )}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center md:text-left">
          Don’t have an account?{" "}
          <a href="/signup" className="text-red-600 font-medium">
            Sign up
          </a>
        </p>
      </div>

      <div className="hidden md:flex w-1/2 bg-[#fff0f0] justify-center items-end relative">
        <img
          src={loginImg}
          alt="Login"
          className="w-[90%] h-auto object-contain mb-10"
        />
      </div>
    </div>
  );
}
