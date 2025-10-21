import axios from "axios";

const BASE_URL = import.meta.env.VITE_USERS_BASE_URL;

export const getAllUsers = async () => {
  const res = await axios.get(`${BASE_URL}/users`);
  return res.data;
};

export const createUser = async (user) => {
  try {
    const res = await axios.post(`${BASE_URL}/users`, user);
    return res.data;
  } catch (error) {
    return { ...user, id: Date.now() }; 
  }
};
 
export const updateUser = async (user) => {
  const { id, ...data } = user;
  try {
    const res = await axios.put(`${BASE_URL}/users/${id}`, data);
    return res.data;
  } catch (error) {
  
    return user;
  }
};
