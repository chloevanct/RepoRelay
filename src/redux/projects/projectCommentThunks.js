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
        return await addCommentApi(projectID, comment);
    }
);

export const updateCommentAsync = createAsyncThunk(
    'comments/updateComment',
    async ({ projectID, commentID, comment }) => {
        return await updateCommentApi(projectID, commentID, comment);
    }
);

export const updatePartialCommentAsync = createAsyncThunk(
    'comments/updatePartialComment',
    async ({ projectID, commentID, comment }) => {
        return await updatePartialCommentApi(projectID, commentID, comment);
    }
);

export const deleteCommentAsync = createAsyncThunk(
    'comments/deleteComment',
    async ({ projectID, commentID }) => {
        return await deleteCommentApi(projectID, commentID);
    }
);