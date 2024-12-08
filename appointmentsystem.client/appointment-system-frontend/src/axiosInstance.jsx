// src/axiosInstance.js
import axios from "axios";

// Create an Axios instance with the base URL of your backend API
const axiosInstance = axios.create({
    baseURL: "http://localhost:7200/api", // Adjust to your backend API URL
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
