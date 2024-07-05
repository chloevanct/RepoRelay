import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProjectsApi, addProjectApi, updateProjectApi, deleteProjectApi } from './projectCardService';

export const getProjectsAsync = createAsyncThunk (
    'cards/getProjects',
    async() => {
        return await getProjectsApi();
    }
);

// GET a project by ProjectID
export const getProjectAsync = createAsyncThunk (
    'cards/getProject',
    async(id) => {
        return await getProjectApi(id);
    }
);

export const addProjectAsync = createAsyncThunk (
    'cards/addProject',
    async(project) => {
        return await addProjectApi(project);
    }
);

export const updateProjectAsync = createAsyncThunk (
    'cards/updateProject',
    async(id, project) => {
        return await updateProjectApi(id, project);
    }
);

export const updatePartialProjectAsync = createAsyncThunk (
    'cards/updatePartialProject',
    async(id, project) => {
        return await updatePartialProjectApi(id, project);
    }
);

export const deleteProjectAsync = createAsyncThunk (
    'cards/deleteProject',
    async(id) => {
        return await deleteProjectApi(id);
    }
);