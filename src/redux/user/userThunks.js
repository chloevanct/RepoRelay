import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserApi, createUserApi, updateUserApi } from './userService';

export const fetchUserAsync = createAsyncThunk(
  'user/fetchUser',
  async (githubUsername) => {
    return await getUserApi(githubUsername);
  }
);

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (token) => {
    return await createUserApi(token);
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async ({ githubUsername, updateData }) => {
    return await updateUserApi(githubUsername, updateData);
  }
);
