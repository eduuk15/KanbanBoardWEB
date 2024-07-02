import axios, { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://kanbanboardweb-production-e73b.up.railway.app",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json", // Você pode adicionar outros cabeçalhos aqui se necessário
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    handleAxiosError(error);
    return Promise.reject(error);
  }
);

const handleAxiosError = (error: any) => {
  if (error.response) {
    console.error("Request failed with status:", error.response.status);
    console.error("Error details:", error.response.data);
  } else if (error.request) {
    console.error("Request failed:", error.request);
  } else {
    console.error("Error:", error.message);
  }
};
