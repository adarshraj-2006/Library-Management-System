import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    withCredentials: true,
});

// Request interceptor to add token
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Simple response interceptor (removed refresh logic)
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
        
        // Handle rate limit errors (429)
        if (error.response?.status === 429) {
            const retryAfter = error.response?.data?.retryAfter || 15 * 60;
            const minutes = Math.ceil(retryAfter / 60);
            toast.error(`Too many requests. Please wait ${minutes} minute${minutes !== 1 ? 's' : ''} before trying again.`, {
                duration: 5000,
            });
        }
        
        return Promise.reject(error);
    }
);

export default API;
