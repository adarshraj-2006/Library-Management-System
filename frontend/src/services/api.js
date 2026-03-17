import axios from "axios";
import toast from "react-hot-toast";


const rawUrl = import.meta.env.VITE_API_URL || "https://library-management-system-v9gy.onrender.com/api";
// Ensure BASE_URL doesn't end with a slash to avoid double slashes in requests
const BASE_URL = rawUrl.endsWith('/') ? rawUrl.slice(0, -1) : rawUrl;

const API = axios.create({
  baseURL: BASE_URL,
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
