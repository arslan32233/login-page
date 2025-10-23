// src/components/Header.jsx
import React from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="flex justify-between items-center bg-gray-100 px-6 py-3 shadow">
      <h1 className="text-xl font-semibold text-blue-700">PROCRAFT</h1>

      {user ? (
        <div className="text-gray-700">
          Welcome, <span className="font-semibold">{user.name}</span>
        </div>
      ) : (
        <span className="text-gray-400 italic">No Profile</span>
      )}
    </header>
  );
}
