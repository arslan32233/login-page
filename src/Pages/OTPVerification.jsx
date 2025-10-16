import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ForgetPassword } from "../services/userServices";

export default function OTPVerification() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };


  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");
    setLoading(true);
    try {
      const res = await ForgetPassword({ email });
      if (res?.message) toast.success(res.message);
      setOtpSent(true);
      setTimer(600);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required to verify OTP");
    setLoading(true);
    try {
      const res = await ForgetPassword({ email });
      if (res?.message) toast.success(res.message);
e
      setTimeout(() => navigate("/new-password", { state: { email } }), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-gray-800">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-600">OTP Verification</h2>
        <p className="text-center text-gray-600">Enter your email to receive an OTP</p>

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
              className={`w-full py-2 rounded-md text-white transition ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-white transition ${
                loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Expires in: {formatTimer(timer)}</span>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={timer > 0 || loading}
                className={`text-sm ${
                  timer > 0 || loading ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:underline"
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
