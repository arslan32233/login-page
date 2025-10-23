import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import signupImg from "../assets/login.jpg";

export default function Signup() {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [preferenceProgramming, setPreferenceProgramming] = useState([]);

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch(signupThunk({ name, email, password, preferenceProgramming }));
  };

  useEffect(() => {
    if (user) {
      toast.success(" success.");
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const DotsLoader = () => (
    <div className="flex space-x-1 justify-center items-center">
      <div className="h-1.5 w-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="h-1.5 w-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="h-1.5 w-1.5 bg-white rounded-full animate-bounce" />
    </div>
  );

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
              Preferences / Programming (comma-separated)
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
            {loading && <DotsLoader />}
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
