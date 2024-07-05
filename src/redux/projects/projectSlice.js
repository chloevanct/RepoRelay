import { createSlice } from '@reduxjs/toolkit';
import initialCardsState from './initialProjectState';
import { getProjectsAsync, getProjectAsync, addProjectAsync, updateProjectAsync, updatePartialProjectAsync, deleteProjectAsync } from './projectCardThunks';

/*
Code adapted from the following documentation:
  https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers
Actions supported:
  addProject(payload: project)
  toggleTagFilter(payload: (string)tag)
  clearFilters()
*/

const projectSlice = createSlice({
    name: 'projects',
    initialState: initialCardsState,
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
        .addCase(getProjectsAsync.fulfilled, (state, action) => {
            state.projects = action.payload;
        })
        .addCase(getProjectAsync.fulfilled, (state, action) => {
            state.projects.push(action.payload); // GET a project by ProjectID and add to [projects]
        })
        .addCase(addProjectAsync.fulfilled, (state, action) => {
            state.projects.push(action.payload);
        })
        .addCase(updateProjectAsync.fulfilled, (state, action) => {
            const index = state.projects.findIndex(project => project.id === action.payload.id);
            if (index !== -1) {
                state.projects[index] = action.payload;
            }
        })
        .addCase(updatePartialProjectAsync.fulfilled, (state, action) => {
            const index = state.projects.findIndex(project => project.id === action.payload.id);
            if (index !== -1) {
                state.projects[index] = {
                    ...state.projects[index],
                    ...action.payload,
                }
            }
        })
        .addCase(deleteProjectAsync.fulfilled, (state, action) => {
            state.projects = state.projects.filter(project => project.id === action.payload.id)
        })
    },
});

export const { addProject, toggleTagFilter, clearFilters, setSearchQuery } = projectSlice.actions;

export default projectSlice.reducer;
