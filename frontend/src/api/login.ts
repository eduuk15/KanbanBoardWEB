import { axiosInstance } from "../services/axiosInstance";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(
      "https://kanbanboardweb-production-e73b.up.railway.app/login",
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
