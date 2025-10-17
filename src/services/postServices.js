import axios from "axios";

const BASE_URL = import.meta.env.VITE_USERS_BASE_URL + "/posts";

export const getAllPosts = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createPost = async (data) => {
  const res = await axios.post(BASE_URL, data);
  return res.data;
};

export const updatePost = async (data) => {
  const res = await axios.put(`${BASE_URL}/${data.id}`, data);
  return res.data;
};
