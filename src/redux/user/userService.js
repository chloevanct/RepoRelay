const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

export const getUserApi = async (githubUsername) => {
  const response = await fetch(`${serverUrl}/user/${githubUsername}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(`Error fetching user: ${response.statusText}`);
  }
  return await response.json();
};

export const createUserApi = async (token) => {
  const response = await fetch(`${serverUrl}/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  if (!response.ok) {
    throw new Error(`Error creating user: ${response.statusText}`);
  }
  return await response.json();
};

export const updateUserApi = async (githubUsername, updateData) => {
  const response = await fetch(`${serverUrl}/user/${githubUsername}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  });
  if (!response.ok) {
    throw new Error(`Error updating user: ${response.statusText}`);
  }
  return await response.json();
};
