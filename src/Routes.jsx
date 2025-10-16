import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/login.jsx";
import Signup from "./Pages/Signup.jsx";
import ForgetPassword from "./Pages/ForgetPassword.jsx";
import OTPVerification from "./Pages/OTPVerification.jsx";
import NewPassword from "./Pages/NewPassword.jsx";
import SuccessPage from "./Pages/SuccessPage.jsx";
import Home from "./Pages/Home.jsx";
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


