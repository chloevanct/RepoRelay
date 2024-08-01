// redux/projects/projectTaskService.js
import { handleResponse } from '../../utils/apiUtils.js';
import { API_BASE_URL } from './projectCardService.js';

const API_TASKS_URL = `${API_BASE_URL}/:projectID/tasks`;

// GET list of all tasks in a project
export const getTasksApi = async (projectID) => {
    const response = await fetch(API_TASKS_URL.replace(':projectID', projectID), {
        method: 'GET',
    });
    return handleResponse(response);
};

// GET a specific task in a project by its _id
export const getTaskApi = async (projectID, taskID) => {
    const response = await fetch(`${API_TASKS_URL.replace(':projectID', projectID)}/${taskID}`, {
        method: 'GET',
    });
    return handleResponse(response);
};

// POST a new task to a project
export const addTaskApi = async (projectID, task) => {
    const response = await fetch(API_TASKS_URL.replace(':projectID', projectID), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    return handleResponse(response);
};

// PUT (edit) a task in a project
export const updateTaskApi = async (projectID, taskID, task) => {
    const response = await fetch(`${API_TASKS_URL.replace(':projectID', projectID)}/${taskID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    return handleResponse(response);
};

// PATCH (partial edit) a task in a project
export const updatePartialTaskApi = async (projectID, taskID, task) => {
    const response = await fetch(`${API_TASKS_URL.replace(':projectID', projectID)}/${taskID}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    return handleResponse(response);
};

// DELETE a task from a project
export const deleteTaskApi = async (projectID, taskID) => {
    const response = await fetch(`${API_TASKS_URL.replace(':projectID', projectID)}/${taskID}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};
