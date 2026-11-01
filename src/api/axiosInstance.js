import axios from "axios";

export const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:5000"
    : "https://oira-interior-server.onrender.com");

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Auto-attach JWT token for every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("oria_admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

