import { createAsyncThunk } from "@reduxjs/toolkit";

import { updateUserPreferences } from "./updateUserPreferences";

export const updateUser = createAsyncThunk(
  "user/updateProjects",
  async ({ githubUsername, updateData }) => {
    return await updateUserPreferences(githubUsername, updateData);
  }
);
