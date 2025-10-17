import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between bg-white shadow-md px-6 py-3">
      <div
        className="text-2xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        PROCRAFT
      </div>

      <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-1/3">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent w-full outline-none text-sm"
        />
        <i className="ri-search-line text-gray-500"></i>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/users")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Add User
        </button>
        <button
          onClick={() => navigate("/posts")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Add Post
        </button>

        <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-sm text-gray-700">
          A
        </div>
      </div>
    </header>
  );
}
