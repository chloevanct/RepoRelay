import { handleResponse } from "../../utils/apiUtils.js";

const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";
export const EMAIL_API_BASE_URL = `${serverUrl}/email`;

// POST to subscribe to a project
export const subscribeToProjectApi = async (emailData) => {
    const response = await fetch(`${EMAIL_API_BASE_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
    });

    return handleResponse(response);
};