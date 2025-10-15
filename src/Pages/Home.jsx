import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          🎉 Logged In Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          Welcome to your Home Page. You are now logged in.
        </p>
        <a
          href="/Login"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Logout
        </a>
      </div>
    </div>
  );
}
