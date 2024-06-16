import { createSlice, configureStore } from '@reduxjs/toolkit'
import initialCardsState from './InitialCardsState'

/*
Code adapted from the following documentation:
  https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers
Actions supported:
  addCard(payload: projectCard)
  toggleTagFilter(payload: (string)tag)
  clearFilters()
*/

const cardSlice = createSlice({
    name: 'cards',
    initialState: initialCardsState,
    reducers: {
        addCard: (state, action) => {
            const projectCard = action.payload;
            state.cards.push(projectCard);
        },
        toggleTagFilter: (state, action) => {
            const { tag, type } = action.payload;

            // Ensure only one difficulty tag can be selected at once
            if (type === 'difficultyTag') {
                state.filters.difficultyTag = tag === state.filters.difficultyTag ? '' : tag;
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

const store = configureStore({
    reducer: {
        cards: cardSlice.reducer
    }
});

export const { addCard, toggleTagFilter, clearFilters, setSearchQuery } = cardSlice.actions;
export default store;