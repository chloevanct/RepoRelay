import { handleResponse } from '../../utils/apiUtils.js';

import { API_BASE_URL } from './projectCardService.js';


const API_COMMENTS_URL = `${API_BASE_URL}/:projectID/comments`;

// GET list of all comments in a project
export const getCommentsApi = async (projectID) => {
    const response = await fetch(API_COMMENTS_URL.replace(':projectID', projectID), {
        method: 'GET',
    });

    return handleResponse(response);
};

// GET a specific comment in a project by its _id
export const getCommentApi = async (projectID, commentID) => {
    const response = await fetch(`${API_COMMENTS_URL.replace(':projectID', projectID)}/${commentID}`, {
        method: 'GET',
    });

    return handleResponse(response);
};

// POST a new comment to a project
export const addCommentApi = async (projectID, comment) => {
    console.log('in service...')
    const response = await fetch(API_COMMENTS_URL.replace(':projectID', projectID), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment),
    });
    console.log('response: ', response);

    const data = await handleResponse(response);
    return { projectID, comment: data };
};

// PUT (edit) a comment in a project
export const updateCommentApi = async (projectID, commentID, comment) => {
    const response = await fetch(`${API_COMMENTS_URL.replace(':projectID', projectID)}/${commentID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment),
    });

    return handleResponse(response);
};

// PATCH (partial edit) a comment in a project
export const updatePartialCommentApi = async (projectID, commentID, comment) => {
    const response = await fetch(`${API_COMMENTS_URL.replace(':projectID', projectID)}/${commentID}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment),
    });

    return handleResponse(response);
};

// DELETE a comment from a project
export const deleteCommentApi = async (projectID, commentID) => {
    const response = await fetch(`${API_COMMENTS_URL.replace(':projectID', projectID)}/${commentID}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${response.status}: ${errorText}`);
    }

    return commentID;
};