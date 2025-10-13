import axios from "axios";

const BASE_URL = "https://yourbackend.com/api";

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${BASE_URL}/login`, { email, password });
    return res.data; // usually { token, user }
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};

export const signupUser = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/signup`, data);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Signup failed" };
  }
};
