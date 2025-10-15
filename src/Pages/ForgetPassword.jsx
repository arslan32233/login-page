import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function OTPVerification() {
  const BASE_URL = "https://vox-backend.vercel.app";
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    let interval;
    if (timer > 0) interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);
  const handleSendOtp = async (e) => {
    e?.preventDefault();
    if (!email) return toast.error("Please enter your email", { icon: "❌" });

    try {
      const res = await fetch(`${BASE_URL}/api/public/users/forgot-password`, {  // <-- FIXED
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Email not found", { icon: "🚫" });
        return;
      }

      setOtpSent(true);
      setTimer(300);
      toast.success(`OTP sent to ${email} ✅`, { icon: "✉️" });
    } catch (err) {
      console.log(err);
      toast.error("Failed to send OTP 😢");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return toast.error("Please enter OTP", { icon: "⚠️" });
    if (otp.length !== 6) return toast.warning("OTP must be 6 digits", { icon: "⚠️" });

    try {
      const res = await fetch(`${BASE_URL}/api/public/users/verify-otp`, {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Invalid OTP", { icon: "🚫" });
        return;
      }

      toast.success("OTP verified successfully! 🎉", { icon: "✅" });
      setTimeout(() => navigate("/new-password"), 2000);
    } catch (err) {
      console.log(err);
      toast.error("Verification failed 😢");
    }
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-gray-800">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-600">Email Verification</h2>
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
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all"
            >
              Send OTP
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
              className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-all"
            >
              Verify OTP
            </button>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Expires in: {formatTimer(timer)}</span>
              <button
                type="button"
                onClick={handleSendOtp}
                className="text-sm text-blue-600 hover:underline"
                disabled={timer > 0}
              >
                Resend OTP
              </button>
            </div>
          </form>
        )}
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        toastStyle={{ backgroundColor: "#ffffff", color: "#333", borderRadius: "10px", border: "1px solid #ddd" }}
        progressStyle={{ background: "linear-gradient(90deg, #3b82f6, #10b981, #9333ea)" }}
      />
    </div>
  );
}
