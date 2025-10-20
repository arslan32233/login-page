import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/login.jsx";
import Signup from "./Pages/Signup.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import OTPVerification from "./Pages/OTPVerification.jsx";
import NewPassword from "./Pages/NewPassword.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";
import Home from "./Pages/Home.jsx";
import PostsPage from "./Pages/PostsPage";
import UsersPage from "./Pages/UsersPage";
import Header from "./components/Header.jsx";

   const hideHeaderRoutes = ["/login", "/signup"];
 const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);
  const showHeader = ["/home", "/users", "/posts"].includes(location.pathname);


export default function AppRoutes() {
  return (
    
        <>
      {!shouldHideHeader && <Header />}


    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/verify-otp" element={<OTPVerification />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/posts" element={<PostsPage />} />
       <Route path="/users" element={<UsersPage />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
        </>
  );
}


