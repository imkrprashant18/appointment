import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Replace with your actual API base URL
  headers: {
    "Content-Type": "application/json",
  },
});
