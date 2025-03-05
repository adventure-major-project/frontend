import axios from "axios";
import API_BASE_URL from "@/lib/config";
const axiosContainer = axios.create({
  withCredentials: true,
  baseURL: API_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": API_BASE_URL,
  },
});

axiosContainer.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosContainer;
