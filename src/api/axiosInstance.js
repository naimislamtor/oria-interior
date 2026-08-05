import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://oira-interior-server.onrender.com",
  withCredentials: true,
});

export default axiosInstance;
