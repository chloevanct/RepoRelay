import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProjectsApi, getProjectApi, addProjectApi, updateProjectApi, updatePartialProjectApi, deleteProjectApi } from './projectCardService';

export const getProjectsAsync = createAsyncThunk (
    'projects/getProjects',
    async() => {
        return await getProjectsApi();
    }
);

// GET a project by ProjectID
export const getProjectAsync = createAsyncThunk (
    'projects/getProject',
    async(id) => {
        return await getProjectApi(id);
    }
);

export const addProjectAsync = createAsyncThunk (
    'projects/addProject',
    async(project) => {
        return await addProjectApi(project);
    }
);

export const updateProjectAsync = createAsyncThunk (
    'projects/updateProject',
    async({ id, project }) => {
        return await updateProjectApi(id, project);
    }
);

export const updatePartialProjectAsync = createAsyncThunk (
    'projects/updatePartialProject',
    async({ id, project }) => {
        return await updatePartialProjectApi(id, project);
    }
);

export const deleteProjectAsync = createAsyncThunk (
    'projects/deleteProject',
    async(id) => {
        return await deleteProjectApi(id);
    }
);