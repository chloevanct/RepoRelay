/* Referenced Chloe V Assignment 3 */

import { handleResponse } from '../../utils/apiUtils.js';


export const API_BASE_URL = 'http://localhost:3000/projects'

// GET list of projects
export const getProjectsApi = async () => {
    const response = await fetch(API_BASE_URL, {
        method: 'GET',
    });

    return handleResponse(response);
}

// GET a project by projectID
export const getProjectApi = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'GET',
    });

    return handleResponse(response);
}

// POST a new project
export const addProjectApi = async (project) => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
    });

    return handleResponse(response);
}

// PUT (edit) a project
export const updateProjectApi = async (id, project) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
    });

    return handleResponse(response);
}


// PATCH (partial edit) a project
export const updatePartialProjectApi = async (id, project) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
    });

    return handleResponse(response);
}

// DELETE a project
export const deleteProjectApi = async (id) => {
    const response = await fetch (`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${response.status}: ${errorText}`);
    }

    return id;
}