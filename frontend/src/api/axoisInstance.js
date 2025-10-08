import axios from "axios";

const BASE_URL = import.meta.env.BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});
