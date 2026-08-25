// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "https://oira-interior-server.onrender.com",
//   withCredentials: true,
// });

// export default axiosInstance;


import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
