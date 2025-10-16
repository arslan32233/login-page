import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function OTPVerification() {
  const BASE_URL = "https://vox-backend.vercel.app";
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // countdown timer
  useEffect(() => {
    let interval;
    if (timer > 0) interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // format mm:ss
  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // send otp
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/public/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Email not found");
        return;
      }

      setOtpSent(true);
      setTimer(600); // 10 minutes
      toast.success("OTP sent successfully ✅");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP 😢");
    } finally {
      setLoading(false);
    }
  };

  // verify otp
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return toast.error("Please enter OTP");
    if (otp.length !== 6) return toast.warning("OTP must be 6 digits");

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/public/users/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Invalid OTP");
        return;
      }

      toast.success("OTP verified successfully 🎉");
      setTimeout(() => navigate("/new-password"), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Verification failed 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-gray-800">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-600">Email Verification</h2>
        <p className="text-center text-gray-600">
          Enter your email to receive an OTP
        </p>

        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-gray-50 text-gray-900 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-2 rounded-md text-white transition ${
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
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              className="w-full bg-gray-50 text-gray-900 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-center tracking-widest text-lg"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-2 rounded-md text-white transition ${
                loading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
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
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Expires in: {formatTimer(timer)}
              </span>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={timer > 0 || loading}
                className={`text-sm ${
                  timer > 0 || loading
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:underline"
                }`}
              >
                {loading ? "Sending..." : "Resend OTP"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
