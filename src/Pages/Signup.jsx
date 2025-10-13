import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signupImg from "../assets/login.jpg";
import { signupUser } from "../services/authServices";

export default function Signup({ setToken }) { // receive setToken from parent
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [preferenceProgramming, setPreferenceProgramming] = useState([]); // array
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    // Basic validations
    if (!name || !email || !password || !confirmPassword) {
      setMessage("❌ Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await signupUser({
        name,
        email,
        password,
        preferenceProgramming,
      });

      if (res.token) setToken(res.token); // store in memory

      setMessage("✅ Signup successful!");
      setTimeout(() => navigate("/home"), 500);
    } catch (err) {
      setMessage(`❌ ${err.message || "Signup failed"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-10 bg-white">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-blue-600 text-center md:text-left">
          Sign Up
        </h1>

        <form onSubmit={handleSignup} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 text-gray-600">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-gray-600">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* References / Programming as comma-separated input */}
          <div>
            <label className="block mb-1 text-gray-600">
              References / Programming (comma-separated)
            </label>
            <input
              type="text"
              value={preferenceProgramming.join(", ")}
              onChange={(e) =>
                setPreferenceProgramming(
                  e.target.value.split(",").map((item) => item.trim())
                )
              }
              placeholder="e.g. React, Node.js, Python"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* Submit */}
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

      {/* Right Image Section */}
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
