import React from "react";
import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          ✅ Password Changed Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          Your password has been updated successfully.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
