import { axiosInstance } from "../services/axiosInstance";

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (
  email: string,
  password: string,
  confirmationQuestion: string,
  confirmationAnswer: string
) => {
  try {
    const response = await axiosInstance.post("/users", {
      email,
      password,
      confirmation_question: confirmationQuestion,
      confirmation_answer: confirmationAnswer,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const response = await axiosInstance.get(`/users/by-email/${email}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changeUserPassword = async (
  email: string,
  password: string,
  confirmationQuestion: string,
  confirmationAnswer: string
) => {
  try {
    const response = await axiosInstance.post("/users/change-password", {
      email,
      password,
      confirmation_question: confirmationQuestion,
      confirmation_answer: confirmationAnswer,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
