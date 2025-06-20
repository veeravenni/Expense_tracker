import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Set a timeout of 10 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const accesstoken = localStorage.getItem("token"); // Assuming the token is stored in localStorage
    if (accesstoken) {
      config.headers.Authorization = `Bearer ${accesstoken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login"; // Redirect to login page
      } else if (error.response.status === 500) {
        console.log("Server error..please try again later");
      }
    } else if (error.code === "ECONNABORTED") {
      console.log("Request timed out. Please try again later.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
