import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../requestState';
import { getProjectsAsync, getProjectAsync, addProjectAsync, updateProjectAsync, updatePartialProjectAsync, deleteProjectAsync } from './projectCardThunks';
import { getTasksAsync, getTaskAsync, addTaskAsync, updateTaskAsync, updatePartialTaskAsync, deleteTaskAsync } from './projectTaskThunks';
import { getCommentsAsync, getCommentAsync, addCommentAsync, updateCommentAsync, updatePartialCommentAsync, deleteCommentAsync } from './projectCommentThunks';

/*
Code adapted from the following documentation:
  https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers
Actions supported:
  addProject(payload: project)
  toggleTagFilter(payload: (string)tag)
  clearFilters()
*/
const INITIAL_STATE = {
    projects: [],
    getProjects: REQUEST_STATE.IDLE,
    getProject: REQUEST_STATE.IDLE,
    addProject: REQUEST_STATE.IDLE,
    updateProject: REQUEST_STATE.IDLE,
    deleteProject: REQUEST_STATE.IDLE,
    filters: {
        difficultyTag: '',
        projectTags: [],
        techTags: []
    },
    searchQuery: '',
    error: null
};

const projectSlice = createSlice({
    name: 'projects',
    initialState: INITIAL_STATE,
    reducers: {
        addProject: (state, action) => {
            const project = action.payload;
            state.projects.push(project);
        },
        toggleTagFilter: (state, action) => {
            const { tag, type } = action.payload;

            // Ensure only one difficulty tag can be selected at once
            if (type === 'difficultyTag') {
                state.filters.difficultyTag = tag === null ? '' : tag;
            } else {
                const currentFilters = state.filters[type];

                const isExistingFilter = currentFilters.includes(tag);
                const updatedFilters = isExistingFilter
                    ? currentFilters.filter((f) => f !== tag)
                    : [...currentFilters, tag];

                state.filters[type] = updatedFilters;
            }
        },
        clearFilters: (state) => {
            state.filters = {
                difficultyTag: '',
                projectTags: [],
                techTags: []
            };
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        /* get ALL projects */
        .addCase(getProjectsAsync.fulfilled, (state, action) => {
            state.getProjects = REQUEST_STATE.FULFILLED
            state.projects = action.payload;
        })
        .addCase(getProjectsAsync.pending, (state) => {
            state.getProjects = REQUEST_STATE.PENDING
            state.error = null;
        })
        .addCase(getProjectsAsync.rejected, (state, action) => {
            state.getProjects = REQUEST_STATE.REJECTED
            state.error = action.error;
        })

        /* get ONE project */
        .addCase(getProjectAsync.fulfilled, (state, action) => {
            state.projects.push(action.payload); // GET a project by ProjectID and add to [projects]
        })

        /* add a project */
        .addCase(addProjectAsync.fulfilled, (state, action) => {
            state.projects.push(action.payload);
        })

        /* update a project */
        .addCase(updateProjectAsync.fulfilled, (state, action) => {
            const index = state.projects.findIndex(project => project.id === action.payload.id);
            if (index !== -1) {
                state.projects[index] = action.payload;
            }
        })

        /* update a project PARTIALLY */
        .addCase(updatePartialProjectAsync.fulfilled, (state, action) => {
            const index = state.projects.findIndex(project => project.id === action.payload.id);
            if (index !== -1) {
                state.projects[index] = {
                    ...state.projects[index],
                    ...action.payload,
                }
            }
        })

        /* delete a project */
        .addCase(deleteProjectAsync.fulfilled, (state, action) => {
            state.projects = state.projects.filter(project => project.id === action.payload.id)
        })

        /* ------------------------------ tasks ------------------------------ */
        /* get ALL tasks */
        .addCase(getTasksAsync.fulfilled, (state, action) => {
            const { projectID, tasks } = action.payload;
            const project = state.projects.find(project => project.id === projectID);
            if (project) {
                project.tasks = tasks;
            }
        })

        /* get ONE task */
        .addCase(getTaskAsync.fulfilled, (state) => {
            const { projectID, task } = action.payload;
            const project = state.projects.find(project => project.id === projectID);
            if (project) {
                project.tasks.push(task); // GET a task by task _id and add to project.tasks array
            }
        })

        /* add a task*/
        .addCase(addTaskAsync.fulfilled, (state) => {
            const { projectID, task } = action.payload;
            const project = state.projects.find(project => project.id === projectID);
            if (project) {
                project.tasks.push(task);
            }
        })

        /* update a task*/
        .addCase(updateTaskAsync.fulfilled, (state) => {
            const { projectID, task } = action.payload;
            const project = state.projects.find(project => project.id === projectID);
            if (project) {
                const index = project.tasks.findIndex(t => t._id === task._id);
                if (index != -1) {
                    project.tasks[index] = task;
                }
            }
        })

        /* update a task PARTIALLY*/
        .addCase(updatePartialTaskAsync.fulfilled, (state) => {
            const { projectID, task } = action.payload;
            const project = state.projects.find(project => project.id === projectID);
            if (project) {
                const index = project.tasks.findIndex(t => t._id === task._id);
                if (index != -1) {
                    project.tasks[index] = {
                        ...project.tasks[index],
                        ...task,
                    }
                }
            }
        })

        /* delete a task*/
        .addCase(deleteTaskAsync.fulfilled, (state) => {
            const { projectID, taskID } = action.payload;
            const project = state.projects.find(project => project.id === projectID);
            if (project) {
                project.tasks = project.tasks.filter(task => task._id != taskID);
            }
        })

        /* ------------------------------ comments ------------------------------ */
        /* get ALL comments */
        .addCase(getCommentsAsync.fulfilled, (state, action) => {
            const { projectID, comments } = action.payload;
            const project = state.projects.find(project => project.id === projectID);
            if (project) {
                project.comments = comments;
            }
        })

        /* get ONE comment */
        .addCase(getCommentAsync.fulfilled, (state) => {
            const { projectID, comment } = action.payload;
            const project = state.projects.find(project => project.id === projectID);
            if (project) {
                project.comments.push(comment); // GET a comment by comment _id and add to project.comment array
            }
        })

        /* add a comment*/
        .addCase(addCommentAsync.fulfilled, (state) => {
            const { projectID, comment } = action.payload;
            const project = state.projects.find(project => project.id === projectID);
            if (project) {
                project.comments.push(comment);
            }
        })

        /* update a comment*/
        .addCase(updateCommentAsync.fulfilled, (state) => {
            const { projectID, comment } = action.payload;
            const project = state.projects.find(project => project.id === projectID);
            if (project) {
                const index = project.comments.findIndex(c => c._id === comment._id);
                if (index != -1) {
                    project.comments[index] = comment;
                }
            }
        })

        /* update a comment PARTIALLY*/
        .addCase(updatePartialCommentAsync.fulfilled, (state) => {
            const { projectID, comment } = action.payload;
            const project = state.projects.find(project => project.id === projectID);
            if (project) {
                const index = project.comments.findIndex(c => c._id === comment._id);
                if (index != -1) {
                    project.comments[index] = {
                        ...project.comments[index],
                        ...comment,
                    }
                }
            }
        })

        /* delete a comment*/
        .addCase(deleteCommentAsync.fulfilled, (state) => {
            const { projectID, commentID } = action.payload;
            const project = state.projects.find(project => project.id === projectID);
            if (project) {
                project.comments = project.comments.filter(comment => comment._id != commentID);
            }
        })
    },
});

export const { addProject, toggleTagFilter, clearFilters, setSearchQuery } = projectSlice.actions;

export default projectSlice.reducer;
