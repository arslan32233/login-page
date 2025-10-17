import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Table from "../components/Table";
import EditModal from "../components/EditModal";
import { getAllUsers, createUser } from "../services/usersServices";
import { getAllPosts, createPost } from "../services/postServices";

export default function Home() {
  const [activeTab, setActiveTab] = useState(""); 
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  
  useEffect(() => {
    if (activeTab === "users") {
      getAllUsers().then(setUsers).catch(console.error);
    } else if (activeTab === "posts") {
      getAllPosts().then(setPosts).catch(console.error);
    }
  }, [activeTab]);

  const handleEdit = (item) => {
    setEditItem(item);
    setIsAdding(false);
    setOpen(true);
  };

  const handleAdd = () => {
    setEditItem(null);  
    setIsAdding(true);  
    setOpen(true);      
  };

  const handleSave = async (data) => {
    try {
      if (isAdding) {
        if (activeTab === "users") {
          const newUser = await createUser(data); 
          setUsers((prev) => [...prev, newUser]);
        } else {
          const newPost = await createPost(data); 
          setPosts((prev) => [...prev, newPost]);
        }
      } else {
        if (activeTab === "users")
          setUsers((prev) =>
            prev.map((u) => (u.id === data.id ? data : u))
          );
        else
          setPosts((prev) =>
            prev.map((p) => (p.id === data.id ? data : p))
          );
      }
      setOpen(false);
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const handleDelete = (id) => {
    if (activeTab === "users") {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } else {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
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

        {activeTab && (
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
            <Table data={users} onEdit={handleEdit} onDelete={handleDelete} />
          </>
        )}

        {activeTab === "posts" && (
          <>
            <h2 className="text-xl font-semibold mb-3">Posts List</h2>
            <Table data={posts} onEdit={handleEdit} onDelete={handleDelete} />
          </>
        )}

        <EditModal
          open={open}
          onClose={() => setOpen(false)}
          item={editItem}
          fields={
            activeTab === "users"
              ? [
                  { key: "name", label: "Name" },
                  { key: "email", label: "Email" },
                  { key: "phone", label: "Phone"  },
                  { key: "username", label: "username"  },
                   
                ]
              : [
                  { key: "title", label: "Title" },
                  { key: "body", label: "Body" },
                ]
          }
          onSave={handleSave}
          isAdding={isAdding}
          activeTab={activeTab}
        />
      </div>
    </div>
  );
}
