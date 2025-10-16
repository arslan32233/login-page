import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const loginUser = async (payload) => {
    const response = await axios.post(`${BASE_URL}api/auth/login`, payload);
    return response.data;
};

export const signupUser = async (payload) => {
    const response = await axios.post(`${BASE_URL}api/auth/signup`, payload);
    return response.data;
}


