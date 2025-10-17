import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Table from "../components/Table";
import { getAllUsers, createUser, updateUser } from "../services/usersServices";
import { getAllPosts, createPost, updatePost } from "../services/postServices";

export default function Home() {
  const [activeTab, setActiveTab] = useState(""); 
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (activeTab === "users") getAllUsers().then(setUsers).catch(console.error);
    else if (activeTab === "posts") getAllPosts().then(setPosts).catch(console.error);

    setEditItem(null);
    setIsAdding(false);
    setFormData({});
  }, [activeTab]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      if (isAdding) {
        let newItem;
        if (activeTab === "users") newItem = await createUser(formData);
        else newItem = await createPost(formData);

        if (activeTab === "users") setUsers((prev) => [...prev, newItem]);
        else setPosts((prev) => [...prev, newItem]);

        setIsAdding(false);
        setFormData({});
      } else if (editItem) {
        let updatedItem;
        if (activeTab === "users") updatedItem = await updateUser(formData);
        else updatedItem = await updatePost(formData);

        if (activeTab === "users")
          setUsers((prev) => prev.map((u) => (u.id === updatedItem.id ? updatedItem : u)));
        else
          setPosts((prev) => prev.map((p) => (p.id === updatedItem.id ? updatedItem : p)));

        setEditItem(null);
        setFormData({});
      }
    } catch (error) {
      console.error("Error saving:", error);
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
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-6 text-center">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

        <div className="space-x-4 mb-4">
          <button
            onClick={() => setActiveTab("users")}
            className={`px-5 py-2 rounded-md ${activeTab === "users" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab("posts")}
            className={`px-5 py-2 rounded-md ${activeTab === "posts" ? "bg-green-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
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
                { key: "name", label: "Name" },
                { key: "email", label: "Email" },
                { key: "phone", label: "Phone" },
                { key: "username", label: "Username" },
                 { key: "Website", label: "Website" },
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
