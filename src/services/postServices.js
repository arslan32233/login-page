import axios from "axios";

const BASE_URL = import.meta.env.VITE_USERS_BASE_URL;

export const getAllPosts = async () => {
  const res = await axios.get(`${BASE_URL}/posts`);
  return res.data;
};

export const createPost = async (post) => {
  try {
    const res = await axios.post(`${BASE_URL}/posts`, post);
    return res.data;
  } catch (error) {
    return { ...post, id: Date.now() };
  }
};

export const updatePost = async (post) => {
  const { id, ...data } = post;
  try {
    const res = await axios.put(`${BASE_URL}/posts/${id}`, data);
    return res.data;
  } catch (error) {
    return post;
  }
};
