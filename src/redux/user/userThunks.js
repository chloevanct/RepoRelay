import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserApi, updateUserApi } from './userService';

export const fetchUserAsync = createAsyncThunk(
  'user/fetchUser',
  async (token) => {
    return await getUserApi(token);
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async ({ githubUsername, updateData }) => {
    return await updateUserApi(githubUsername, updateData);
  }
);
