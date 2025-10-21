import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import Table from "../components/Table";
import { getAllUsers, createUser, updateUser } from "../services/usersServices";
import { getAllPosts, createPost, updatePost } from "../services/postServices";

export default function Home() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab) setActiveTab(tab);
  }, [location.search]);

  useEffect(() => {
    if (activeTab === "users") {
      getAllUsers().then(setUsers).catch(console.error);
    } else if (activeTab === "posts") {
      getAllPosts().then(setPosts).catch(console.error);
    }

    setEditItem(null);
    setIsAdding(false);
    setFormData({});
  }, [activeTab]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({});
    setEditItem(null);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setFormData(item);
    setIsAdding(false);
  };

  const handleSave = async () => {
    try {
      if (activeTab === "users") {
        if (!formData.email?.includes("@")) {
          toast.error("Please enter a valid email!");
          return;
        }
        if (!/^\d{11}$/.test(formData.phone || "")) {
          toast.error("Phone number must be 11 digits!");
          return;
        }
      }

      let newItem = { ...formData };

     if (!newItem.id && isAdding) newItem.id = Date.now();

      
      if (isAdding) {
        if (activeTab === "users") {
          const res = await createUser(newItem);
          setUsers((prev) => [...prev, res]);
        } else {
          const res = await createPost(newItem);
          setPosts((prev) => [...prev, res]);
        }
        toast.success(`${activeTab === "users" ? "User" : "Post"} added successfully!`);
      }
      else if (editItem) {
        if (activeTab === "users") {
          const res = await updateUser(newItem);
          setUsers((prev) =>
            prev.map((u) => (u.id === res.id ? res : u))
          );
        } else {
          const res = await updatePost(newItem);
          setPosts((prev) =>
            prev.map((p) => (p.id === res.id ? res : p))
          );
        }
        toast.success(`${activeTab === "users" ? "User" : "Post"} updated successfully!`);
      }

      setIsAdding(false);
      setEditItem(null);
      setFormData({});
    } catch (error) {
      console.error("Error saving:", error);
      toast.error("Error saving data");
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditItem(null);
    setFormData({});
  };

  const handleDelete = (id) => {
    if (activeTab === "users") setUsers((prev) => prev.filter((u) => u.id !== id));
    else setPosts((prev) => prev.filter((p) => p.id !== id));
    toast.info(`${activeTab === "users" ? "User" : "Post"} deleted.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 text-center">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

        <div className="space-x-4 mb-4">
          <button
            onClick={() => setActiveTab("users")}
            className={`px-5 py-2 rounded-md ${
              activeTab === "users"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab("posts")}
            className={`px-5 py-2 rounded-md ${
              activeTab === "posts"
                ? "bg-green-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Posts
          </button>
        </div>

        {activeTab && !isAdding && !editItem && (
          <div className="mb-5 text-right">
            <button
              onClick={handleAdd}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Add {activeTab === "users" ? "User" : "Post"}
            </button>
          </div>
        )}

        {activeTab === "users" && (
          <>
            <h2 className="text-xl font-semibold mb-3">Users List</h2>
            <Table
              data={users}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isAdding={isAdding}
              editItem={editItem}
              formData={formData}
              onChange={handleChange}
              onSave={handleSave}
              onCancel={handleCancel}
              fields={[
                { key: "id", label: "ID" },
                { key: "name", label: "Name" },
                { key: "email", label: "Email" },
                { key: "phone", label: "Phone" },
                { key: "username", label: "Username" },
                { key: "website", label: "Website" },
              ]}
            />
          </>
        )}

        {activeTab === "posts" && (
          <>
            <h2 className="text-xl font-semibold mb-3">Posts List</h2>
            <Table
              data={posts}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isAdding={isAdding}
              editItem={editItem}
              formData={formData}
              onChange={handleChange}
              onSave={handleSave}
              onCancel={handleCancel}
              fields={[
                { key: "id", label: "ID" },
                { key: "title", label: "Title" },
                { key: "body", label: "Body" },
              ]}
            />
          </>
        )}
      </div>
    </div>
  );
}
