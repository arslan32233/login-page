import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/login.jpg";
import axios from "axios"; // Make sure to install axios

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("❌ Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      // 🔹 API call to backend
      const res = await axios.post("https://your-backend.com/api/login", {
        email,
        password,
      });

      // 🔹 Save token if needed
      localStorage.setItem("token", res.data.token);

      setMessage("✅ Login successful!");
      setTimeout(() => navigate("/home"), 1000);
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || "Login failed"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-10 bg-white">
        <div className="text-left mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 uppercase">
            WELCOME BACK
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {message && (
            <div
              className={`p-3 rounded-md text-sm font-medium ${
                message.includes("❌")
                  ? "bg-red-100 text-red-600 border border-red-400"
                  : "bg-green-100 text-green-600 border border-green-400"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-blue-700"
            }`}
          >
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

      {/* Right Side - Image */}
      <div className="hidden md:flex w-1/2 bg-[#fff0f0] justify-center items-end relative">
        <img
          src={loginImg}
          alt="Login"
          className="w-[90%] h-auto object-contain mb-10"
        />
      </div>

      {/* Mobile Image */}
      <div className="flex md:hidden justify-center bg-[#fff0f0] mt-6">
        <img
          src={loginImg}
          alt="Login"
          className="w-[80%] h-auto object-contain"
        />
      </div>
    </div>
  );
}
