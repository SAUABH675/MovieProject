import axios from "axios";

const backendApi = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token to every request if available
backendApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("movix_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If token expires (401), clear storage and redirect to login
backendApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("movix_token");
      localStorage.removeItem("movix_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default backendApi;
