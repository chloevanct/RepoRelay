// redux/projects/projectCommentThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCommentsApi, getCommentApi, addCommentApi, updateCommentApi, updatePartialCommentApi, deleteCommentApi } from './projectCommentService';

export const getCommentsAsync = createAsyncThunk(
    'comments/getComments',
    async (projectID) => {
        return await getCommentsApi(projectID);
    }
);

export const getCommentAsync = createAsyncThunk(
    'comments/getComment',
    async ({ projectID, commentID }) => {
        return await getCommentApi(projectID, commentID);
    }
);

export const addCommentAsync = createAsyncThunk(
    'comments/addComment',
    async ({ projectID, comment }) => {
        const updatedProject = await addCommentApi(projectID, comment);
        return updatedProject;
    }
);

export const updateCommentAsync = createAsyncThunk(
    'comments/updateComment',
    async ({ projectID, commentID, comment }) => {
        const updatedProject = await updateCommentApi(projectID, commentID, comment);
        return updatedProject;
    }
);

export const updatePartialCommentAsync = createAsyncThunk(
    'comments/updatePartialComment',
    async ({ projectID, commentID, comment }) => {
        const updatedProject = await updatePartialCommentApi(projectID, commentID, comment);
        return updatedProject;
    }
);

export const deleteCommentAsync = createAsyncThunk(
    'comments/deleteComment',
    async ({ projectID, commentID }) => {
        const updatedProject = await deleteCommentApi(projectID, commentID);
        return updatedProject;
    }
);
