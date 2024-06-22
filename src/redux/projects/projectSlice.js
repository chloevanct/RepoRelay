import { createSlice } from '@reduxjs/toolkit';
import initialCardsState from './initialProjectState';

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
    }
});

export const { addProject, toggleTagFilter, clearFilters, setSearchQuery } = projectSlice.actions;

export default projectSlice.reducer;
