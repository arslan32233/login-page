import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/login.jpg";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!email || !password) {
      setMessage("❌ Please fill all fields");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (userData && email === userData.email && password === userData.password) {
        setMessage("✅ Login successful!");
        setLoading(false);
        setTimeout(() => navigate("/home"), 1000);
      } else {
        setMessage("❌ Invalid Email or Password");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
  
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-10 bg-white">

        <div className="text-left mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 uppercase">
            Welcome Back
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
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-red-500" /> Remember me
            </label>
           
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

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white font-medium transition ${
              loading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Logging in..." : "Sign in"}
          </button>

         
          
        </form>

        {/* Signup Link */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don’t have an account?{" "}
          <a href="/signup" className="text-red-600 font-medium hover:underline">
            Sign up for free!
          </a>
        </p>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:flex w-1/2 bg-[#fff0f0] justify-center items-end relative">
        <img
          src={loginImg}
          alt="Login Illustration"
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
