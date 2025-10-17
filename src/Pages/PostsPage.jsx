import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Table from "../components/Table";
import EditModal from "../components/EditModal";
import { getAllPosts } from "../services/postServices";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await getAllPosts();
    setPosts(res);
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSave = (updatedPost) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header title="Posts Management" />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Posts List</h2>
        <Table data={posts} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      <EditModal
        open={open}
        onClose={() => setOpen(false)}
        item={selectedPost}
        fields={[
          { key: "title", label: "Title" },
          { key: "body", label: "Body" },
        ]}
        onSave={handleSave}
      />
    </div>
  );
}
