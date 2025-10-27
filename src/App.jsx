import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, setTokenExpiry } from "./slices/authSlice";

function AppWrapper() {
  const dispatch = useDispatch();
  const { token, tokenExpiry } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) return;

    const checkExpiry = () => {
      const now = Date.now();
      if (tokenExpiry && now >= tokenExpiry) {
        dispatch(logout());
        toast.info("Session expired. Please login again.");
      }
    };

    const interval = setInterval(checkExpiry, 1000);
    return () => clearInterval(interval);
  }, [token, tokenExpiry, dispatch]);

  return <AppRoutes />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </BrowserRouter>
  );
}
