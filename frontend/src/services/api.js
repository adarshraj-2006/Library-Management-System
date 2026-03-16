import axios from "axios";
import toast from "react-hot-toast";

let BASE_URL = import.meta.env.VITE_API_URL || "https://library-management-system-v9gy.onrender.com/api";

// 1. Trim and remove ANY trailing slashes
BASE_URL = BASE_URL.trim().replace(/\/+$/, "");

// 2. Remove /api from the end if it exists (so we can add it back cleanly)
BASE_URL = BASE_URL.replace(/\/api$/, "");

// 3. Now add exactly one /api/
const API_URL = `${BASE_URL}/api/`;

console.log("Final API Base URL:", API_URL);

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/Login") {
        window.location.href = "/Login";
      }
    }

    if (error.response?.status === 429) {
      const retryAfter = error.response?.data?.retryAfter || 15 * 60;
      const minutes = Math.ceil(retryAfter / 60);
      toast.error(`Too many requests. Wait ${minutes} minute(s).`);
    }

    return Promise.reject(error);
  }
);

export default API;
