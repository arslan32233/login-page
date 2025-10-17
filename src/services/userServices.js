import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Existing APIs
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