import axios, { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://kanbanboardweb.railway.internal",
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
