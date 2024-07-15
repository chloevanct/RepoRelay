import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTasksApi, getTaskApi, addTaskApi, updateTaskApi, updatePartialTaskApi, deleteTaskApi } from './projectTaskService';

export const getTasksAsync = createAsyncThunk(
    'tasks/getTasks',
    async (projectID) => {
        return await getTasksApi(projectID);
    }
);

export const getTaskAsync = createAsyncThunk(
    'tasks/getTask',
    async ({ projectID, taskID }) => {
        return await getTaskApi(projectID, taskID);
    }
);

export const addTaskAsync = createAsyncThunk(
    'tasks/addTask',
    async ({ projectID, task }) => {
        return await addTaskApi(projectID, task);
    }
);

export const updateTaskAsync = createAsyncThunk(
    'tasks/updateTask',
    async ({ projectID, taskID, task }) => {
        return await updateTaskApi(projectID, taskID, task);
    }
);

export const updatePartialTaskAsync = createAsyncThunk(
    'tasks/updatePartialTask',
    async ({ projectID, taskID, task }) => {
        return await updatePartialTaskApi(projectID, taskID, task);
    }
);

export const deleteTaskAsync = createAsyncThunk(
    'tasks/deleteTask',
    async ({ projectID, taskID }) => {
        return await deleteTaskApi(projectID, taskID);
    }
);