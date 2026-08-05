// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "https://oira-interior-server.onrender.com",
//   withCredentials: true,
// });

// export default axiosInstance;


import axios from "axios";

export const BASE_URL = "https://oira-interior-server.onrender.com";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
