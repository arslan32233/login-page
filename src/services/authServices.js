import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginUser = async (payload) => {
  try {
    const res = await axios.post(`${BASE_URL}api/auth/login`, payload);
    return res.data; // { token, user }
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};

export const signupUser = async (payload) => {
  try {
    const res = await axios.post(`${BASE_URL}api/auth/signup`, payload);
    return res.data; // { token, user }
  } catch (err) {
    throw err.response?.data || { message: "Signup failed" };
  }
};
