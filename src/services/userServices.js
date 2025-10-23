import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const ForgetPassword = async (payload) => {
  const response = await axios.post(`${BASE_URL}api/public/users/forgot-password`, payload);
  return response.data;
};

export const forgotNewPassword = async (payload) => {
  const response = await axios.post(`${BASE_URL}api/public/users/set-new-password`, payload);
  return response.data;
};

export const OTPVerification = async (payload) => {
  const response = await axios.post(`${BASE_URL}api/public/users/verify-otp`, payload);
  return response.data;
};
// src/services/userServices.js

export const getUserProfile = async (payload) => {
 const response = await axios.get(`${BASE_URL}api/public/users/profile`, payload);
  return response.data;
};