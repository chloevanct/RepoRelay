import axios from "axios";

export const updateUserProjects = async (githubUsername, updateData) => {
  try {
    const response = await axios.patch(
      `http://localhost:3000/user/${githubUsername}`,
      updateData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user projects:", error);
    throw error;
  }
};
