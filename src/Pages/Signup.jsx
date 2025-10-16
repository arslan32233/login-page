import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signupImg from "../assets/login.jpg";
import { signupUser } from "../services/authServices";
import { toast } from "react-toastify";

export default function Signup({ setToken }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [preferenceProgramming, setPreferenceProgramming] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      console.log("inside try")
      const res = await signupUser({
        name,
        email,
        password,
        preferenceProgramming,
      });
      console.log(res, "signapi")

      // if (res.token) {
      //   setToken(res.token);
      // }

      toast.success("Signup successful 🎉");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed--custom");
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-blue-600 text-center md:text-left">
          Sign Up
        </h1>

        <form onSubmit={handleSignup} className="space-y-5">
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

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded-md text-white transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
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
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
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
