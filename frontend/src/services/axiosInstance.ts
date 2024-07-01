import axios, { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://kanbanboardweb-production.up.railway.app",
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
    console.error("Requisição falhou com o status:", error.response.status);
    console.error("Detalhes:", error.response.data);
  } else if (error.request) {
    console.error("Requição falhou:", error.request);
  } else {
    console.error("Error:", error.message);
  }
};
