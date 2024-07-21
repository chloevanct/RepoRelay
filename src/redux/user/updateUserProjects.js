import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

export const updateUserProjects = async (githubUsername, updateData) => {
  try {
    const response = await axios.patch(
      `${serverUrl}/user/${githubUsername}`,
      updateData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user projects:", error);
    throw error;
  }
};
