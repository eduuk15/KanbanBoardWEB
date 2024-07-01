import { axiosInstance } from "../services/axiosInstance";

export const getCards = async () => {
  try {
    const response = await axiosInstance.get("/tasks");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCard = async (
  title: string,
  description: string,
  status: string,
  type: "fix" | "feature" | "investigation" | "refactor",
  assignedUserId: number,
  priority: "1" | "2" | "3",
  dueDate: string
) => {
  try {
    const response = await axiosInstance.post("/tasks", {
      title,
      description,
      status,
      type,
      assigned_user_id: assignedUserId,
      priority,
      due_date: dueDate,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
