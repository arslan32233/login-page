import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ForgetPassword, Login ,Home, OTPVerification,Signup,NewPassword,SuccessPage} from "./Pages/index.js";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/verify-otp" element={<OTPVerification />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/home" element={<Home />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
