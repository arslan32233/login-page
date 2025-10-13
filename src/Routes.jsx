import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
