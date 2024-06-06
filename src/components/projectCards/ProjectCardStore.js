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
            const projectCard = action.payload
            return {
                ...state,
                cards: [...state.cards, projectCard]
            }
        },
        toggleTagFilter: (state, action) => {
            const { tag, type } = action.payload;
            const currentFilters = state.filters[type];

            // Could use a set here but apparently that's bad practice in redux
            //   So avoiding duplicates like this instead
            const isExistingFilter = currentFilters.includes(tag);
            const updatedFilters = isExistingFilter
                ? currentFilters.filter((f) => f !== tag)
                : [...currentFilters, tag];

            return {
                ...state,
                filters: {
                    ...state.filters,
                    [type]: updatedFilters,
                }
            }
        },
        clearFilters: (state) => {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    projectTags: [],
                    techTags: []
                }
            }
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        }
    }
})

const store = configureStore({
    reducer: {
        cards: cardSlice.reducer
    }
})

export const { addCard, toggleTagFilter, clearFilters, setSearchQuery } = cardSlice.actions
export default store;
