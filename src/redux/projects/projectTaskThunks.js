// redux/projects/projectTaskThunks.js
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
        const updatedProject = await addTaskApi(projectID, task);
        return updatedProject;
    }
);

export const updateTaskAsync = createAsyncThunk(
    'tasks/updateTask',
    async ({ projectID, taskID, task }) => {
        const updatedProject = await updateTaskApi(projectID, taskID, task);
        return updatedProject;
    }
);

export const updatePartialTaskAsync = createAsyncThunk(
    'tasks/updatePartialTask',
    async ({ projectID, taskID, task }) => {
        const updatedProject = await updatePartialTaskApi(projectID, taskID, task);
        return updatedProject;
    }
);

export const deleteTaskAsync = createAsyncThunk(
    'tasks/deleteTask',
    async ({ projectID, taskID }) => {
        const updatedProject = await deleteTaskApi(projectID, taskID);
        return updatedProject;
    }
);
