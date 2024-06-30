import { axiosInstance } from "../services/axiosInstance";

export const getGroup = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/groups/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGroupInvites = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/groups/invites/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateGroup = async (
  id: number,
  name: string,
  description: string
) => {
  try {
    const response = await axiosInstance.put(`/groups/${id}`, {
      name: name,
      description: description,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMyGroups = async () => {
  try {
    const response = await axiosInstance.get("/groups/my-groups");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOtherGroups = async () => {
  try {
    const response = await axiosInstance.get("/groups/other-groups");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendInvite = async (groupId: number) => {
  try {
    const response = await axiosInstance.post(`/groups/invites/${groupId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const acceptInvite = async (inviteId: number) => {
  try {
    const response = await axiosInstance.post(
      `/groups/invites/${inviteId}/accept`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const declineInvite = async (inviteId: number) => {
  try {
    const response = await axiosInstance.post(
      `/groups/invites/${inviteId}/decline`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
