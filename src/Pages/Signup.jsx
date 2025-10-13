import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signupImg from "../assets/login.jpg";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();

    // Validation checks
    if (!email || !phone || !password || !confirmPassword) {
      setMessage("❌ Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    if (phone.length < 10) {
      setMessage("❌ Phone number must be at least 10 digits");
      return;
    }

    setLoading(true);
    setMessage("");

    setTimeout(() => {
    
      const user = { email, phone, password };
      localStorage.setItem("userData", JSON.stringify(user));

      setLoading(false);
      setMessage("✅ Signup successful!");
      setTimeout(() => navigate("/login"), 1000);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-10 bg-white">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-blue-600 text-center md:text-left">
          Sign Up
        </h1>

        <form onSubmit={handleSignup} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"no
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-1 text-gray-600">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Password */}
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

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-gray-600">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
          </div>

          {/* Message */}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center md:text-left">
          Already have an account?{" "}
          <a href="/login" className="text-red-600 font-medium">
            Login
          </a>
        </p>
      </div>

      <div className="hidden md:flex w-1/2 bg-[#fff0f0] justify-center items-end relative">
        <img
          src={signupImg}
          alt="Signup"
          className="w-[90%] h-auto object-contain mb-10"
        />
      </div>


      <div className="flex md:hidden justify-center bg-[#fff0f0] mt-6">
        <img
          src={signupImg}
          alt="Signup"
          className="w-[80%] h-auto object-contain"
        />
      </div>
    </div>
  );
}
