import axios from "axios";

// Default to live Render production server so login and API calls work on domain and localhost
export const BASE_URL = import.meta.env.VITE_API_URL || "https://oira-interior-server.onrender.com";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
