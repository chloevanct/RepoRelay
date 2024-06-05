import { createSlice, configureStore } from '@reduxjs/toolkit'

/*
Code adapted from the following documentation:
  https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers
Actions supported:
  addCard(payload: projectCard)
  toggleTagFilter(payload: (string)tag)
  clearFilters()
*/

// Temp cards list for testing until backend is setup
// Later replaced by API call to DB
const initialCardsState = {
    cards: [
        {
            projectName: "Project 1",
            projectImg: "https://hips.hearstapps.com/hmg-prod/images/cute-photos-of-cats-looking-at-camera-1593184780.jpg",
            postedBy: "username123",
            postedDate: "2024-05-10",
            lastActivityDate: "2024-05-10",
            projectDescription: "This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot.",
            projectTags: [
                'Advanced',
                'AI Development'
            ],
            techTags: [
                'Python'
            ]
        },
        {
            projectName: "Project 2",
            projectImg: "https://media.istockphoto.com/id/1402854418/photo/kitten-with-a-ball.jpg?s=612x612&w=0&k=20&c=-TyFSMp_RKa5sNs0eI5wq2WEdqn4tsvW0tyMTpOsybI=",
            postedBy: "username000",
            postedDate: "2024-05-09",
            lastActivityDate: "2024-05-09",
            projectDescription: "Another project desc",
            projectTags: [
                'Beginner'
            ],
            techTags: [
                'JavaScript',
                'React'
            ]
        }
    ],
    filters: {
        projectTags: [],
        techTags: []
    }
}

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
        }
    }
})

const store = configureStore({
    reducer: {
        cards: cardSlice.reducer
    }
})

export const { addCard, toggleTagFilter, clearFilters } = cardSlice.actions
export default store;
