import React, { useState, useEffect } from "react";

export default function EditModal({ open, onClose, item, fields, onSave, isAdding, activeTab }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (item) setFormData(item);
    else setFormData({});
  }, [item]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    
    if (name === "phone" && value.length > 11) return;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    if (fields.some(f => f.key === "email")) {
      if (!formData.email || !/^[\w.-]+@gmail\.com$/.test(formData.email)) {
        alert("Please enter a valid Gmail address");
        return;
      }
    }

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {isAdding
            ? `Add ${activeTab === "users" ? "User" : "Post"}`
            : `Edit ${activeTab === "users" ? "User" : "Post"}`}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.key} className="flex flex-col text-left">
              <label className="mb-1 font-medium text-gray-700">{field.label}</label>
              <input
                type={field.key === "email" ? "email" : "text"}
                name={field.key}
                value={formData[field.key] || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={field.key === "email" ? "example@gmail.com" : ""}
              />
            </div>
          ))}

          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
