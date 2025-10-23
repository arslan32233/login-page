import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, setProfile } from "../slices/authSlice";
import Table from "../components/Table";
import { getAllUsers, createUser, updateUser } from "../services/usersServices";
import { getAllPosts, createPost, updatePost } from "../services/postServices";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const dummyProfile = {
      name: "Arslan Imran",
      email: "ali112@gmail.com",
      password: "brand1212@",
    };
    dispatch(setProfile(dummyProfile));
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    showToast("info", `👋 ${user?.name || "User"} logged out successfully!`);
    navigate("/login");
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab) setActiveTab(tab);
  }, [location.search]);

  useEffect(() => {
    if (activeTab === "users") {
      getAllUsers()
        .then((res) => {
          setUsers(res);
          showToast("success", " Users data loaded successfully!");
        })
        .catch((err) => showToast("error", `Failed to load users: ${err.message}`));
    } else if (activeTab === "posts") {
      getAllPosts()
        .then((res) => {
          setPosts(res);
          showToast("success", "Posts data loaded successfully!");
        })
        .catch((err) => showToast("error", `Failed to load posts: ${err.message}`));
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
          showToast("error", " Please enter a valid email!");
          return;
        }
        if (!/^\d{11}$/.test(formData.phone || "")) {
          showToast("error", " Phone number must be 11 digits!");
          return;
        }
      }

      let newItem = { ...formData };
      if (!newItem.id && isAdding) newItem.id = Date.now();

      if (isAdding) {
        if (activeTab === "users") {
          const res = await createUser(newItem);
          setUsers((prev) => [...prev, res]);
          showToast("success", res.message || " User added successfully!");
        } else {
          const res = await createPost(newItem);
          setPosts((prev) => [...prev, res]);
          showToast("success", res.message || " Post added successfully!");
        }
      } else if (editItem) {
        if (activeTab === "users") {
          const res = await updateUser(newItem);
          setUsers((prev) => prev.map((u) => (u.id === res.id ? res : u)));
          showToast("success", res.message || " User updated successfully!");
        } else {
          const res = await updatePost(newItem);
          setPosts((prev) => prev.map((p) => (p.id === res.id ? res : p)));
          showToast("success", res.message || " Post updated successfully!");
        }
      }

      setIsAdding(false);
      setEditItem(null);
      setFormData({});
    } catch (error) {
      console.error("Error saving:", error);
      showToast("error", ` Error saving data: ${error.message || "Unknown error"}`);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditItem(null);
    setFormData({});
  };


  const handleDelete = (id) => {
    if (activeTab === "users")
      setUsers((prev) => prev.filter((u) => u.id !== id));
    else
      setPosts((prev) => prev.filter((p) => p.id !== id));

    showToast("info", `${activeTab === "users" ? "User" : "Post"} deleted successfully!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-between items-center p-6 bg-white shadow-md">
        <div>
          <h1 className="text-2xl font-semibold text-gray-700">Dashboard</h1>
          {user ? (
            <p className="text-gray-500 text-sm">
              Logged in as: <strong>{user.name}</strong> ({user.email})
            </p>
          ) : (
            <p className="text-gray-400 text-sm">No user profile found</p>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="p-6 text-center">
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
