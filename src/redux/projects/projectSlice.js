// redux/projects/projectSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../requestState';
import { 
    getProjectsAsync, 
    getProjectAsync, 
    addProjectAsync, 
    updateProjectAsync, 
    updatePartialProjectAsync, 
    deleteProjectAsync 
} from './projectCardThunks';
import { 
    getTasksAsync, 
    getTaskAsync, 
    addTaskAsync, 
    updateTaskAsync, 
    updatePartialTaskAsync, 
    deleteTaskAsync 
} from './projectTaskThunks';
import { 
    getCommentsAsync, 
    getCommentAsync, 
    addCommentAsync, 
    updateCommentAsync, 
    updatePartialCommentAsync, 
    deleteCommentAsync 
} from './projectCommentThunks';

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
            .addCase(getProjectsAsync.fulfilled, (state, action) => {
                state.getProjects = REQUEST_STATE.FULFILLED;
                state.projects = action.payload;
            })
            .addCase(getProjectsAsync.pending, (state) => {
                state.getProjects = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getProjectsAsync.rejected, (state, action) => {
                state.getProjects = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(getProjectAsync.fulfilled, (state, action) => {
                state.projects.push(action.payload);
            })
            .addCase(addProjectAsync.fulfilled, (state, action) => {
                state.projects.push(action.payload);
            })
            .addCase(updateProjectAsync.fulfilled, (state, action) => {
                const index = state.projects.findIndex(project => project.projectID === action.payload.projectID);
                if (index !== -1) {
                    state.projects[index] = action.payload;
                }
            })
            .addCase(updatePartialProjectAsync.fulfilled, (state, action) => {
                const index = state.projects.findIndex(project => project.projectID === action.payload.projectID);
                if (index !== -1) {
                    state.projects[index] = {
                        ...state.projects[index],
                        ...action.payload,
                    };
                }
            })
            .addCase(deleteProjectAsync.fulfilled, (state, action) => {
                state.projects = state.projects.filter(project => project.projectID !== action.payload.projectID);
            })
            .addCase(getTasksAsync.fulfilled, (state, action) => {
                const { projectID, tasks } = action.payload;
                const project = state.projects.find(project => project.projectID === projectID);
                if (project) {
                    project.tasks = tasks;
                }
            })
            .addCase(getTaskAsync.fulfilled, (state, action) => {
                const { projectID, task } = action.payload;
                const project = state.projects.find(project => project.projectID === projectID);
                if (project) {
                    project.tasks.push(task);
                }
            })
            .addCase(addTaskAsync.fulfilled, (state, action) => {
                const updatedProject = action.payload;
                const index = state.projects.findIndex(project => project.projectID === updatedProject.projectID);
                if (index !== -1) {
                    state.projects[index] = updatedProject;
                }
            })
            .addCase(updateTaskAsync.fulfilled, (state, action) => {
                const updatedProject = action.payload;
                const index = state.projects.findIndex(project => project.projectID === updatedProject.projectID);
                if (index !== -1) {
                    state.projects[index] = updatedProject;
                }
            })
            .addCase(updatePartialTaskAsync.fulfilled, (state, action) => {
                const updatedProject = action.payload;
                const index = state.projects.findIndex(project => project.projectID === updatedProject.projectID);
                if (index !== -1) {
                    state.projects[index] = updatedProject;
                }
            })
            .addCase(deleteTaskAsync.fulfilled, (state, action) => {
                const updatedProject = action.payload;
                const index = state.projects.findIndex(project => project.projectID === updatedProject.projectID);
                if (index !== -1) {
                    state.projects[index] = updatedProject;
                }
            })
            .addCase(getCommentsAsync.fulfilled, (state, action) => {
                const { projectID, comments } = action.payload;
                const project = state.projects.find(project => project.projectID === projectID);
                if (project) {
                    project.comments = comments;
                }
            })
            .addCase(getCommentAsync.fulfilled, (state, action) => {
                const { projectID, comment } = action.payload;
                const project = state.projects.find(project => project.projectID === projectID);
                if (project) {
                    project.comments.push(comment);
                }
            })
            .addCase(addCommentAsync.fulfilled, (state, action) => {
                const updatedProject = action.payload;
                const index = state.projects.findIndex(project => project.projectID === updatedProject.projectID);
                if (index !== -1) {
                    state.projects[index] = updatedProject;
                }
            })
            .addCase(updateCommentAsync.fulfilled, (state, action) => {
                const updatedProject = action.payload;
                const index = state.projects.findIndex(project => project.projectID === updatedProject.projectID);
                if (index !== -1) {
                    state.projects[index] = updatedProject;
                }
            })
            .addCase(updatePartialCommentAsync.fulfilled, (state, action) => {
                const updatedProject = action.payload;
                const index = state.projects.findIndex(project => project.projectID === updatedProject.projectID);
                if (index !== -1) {
                    state.projects[index] = updatedProject;
                }
            })
            .addCase(deleteCommentAsync.fulfilled, (state, action) => {
                const updatedProject = action.payload;
                const index = state.projects.findIndex(project => project.projectID === updatedProject.projectID);
                if (index !== -1) {
                    state.projects[index] = updatedProject;
                }
            });
    },
});

export const { addProject, toggleTagFilter, clearFilters, setSearchQuery } = projectSlice.actions;

export default projectSlice.reducer;
