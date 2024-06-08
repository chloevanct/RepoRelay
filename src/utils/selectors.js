import { createSelector } from 'reselect';

// Selector to get the list of cards from the state
const selectCards = (state) => state.cards.cards;
// Selector to get the filters from the state
const selectFilters = (state) => state.cards.filters;
// Selector to get the search query from the state and convert it to lowercase
const selectSearchQuery = (state) => state.cards.searchQuery.toLowerCase();

// Selector to get the filtered list of cards based on the search query and filters
export const selectFilteredCards = createSelector(
    [selectCards, selectFilters, selectSearchQuery],
    (cards, filters, searchQuery) => {
        // Destructure the filters for difficulty, project, and tech tags
        const { difficultyTags = [], projectTags = [], techTags = [] } = filters;

        // Filter the cards based on the search query and filters
        return cards.filter((card) => {
            // Check if the card matches the search query in project name or description
            const matchesSearchQuery = card.projectName.toLowerCase().includes(searchQuery) ||
                                       card.projectDescription.toLowerCase().includes(searchQuery);

            // Check if the card matches all selected difficulty filters (or if no filters are selected)
            const matchesDifficultyFilters = difficultyTags.length === 0 ||
                                             difficultyTags.every((filterTag) => card.difficultyTags.includes(filterTag));

            // Check if the card matches all selected project filters (or if no filters are selected)
            const matchesProjectFilters = projectTags.length === 0 ||
                                          projectTags.every((filterTag) => card.projectTags.includes(filterTag));

            // Check if the card matches all selected tech filters (or if no filters are selected)
            const matchesTechFilters = techTags.length === 0 ||
                                       techTags.every((filterTag) => card.techTags.includes(filterTag));

            // Return true if the card matches the search query and all filters
            return matchesSearchQuery && matchesDifficultyFilters && matchesProjectFilters && matchesTechFilters;
        });
    }
);

// Selector to get the count of the filtered cards
export const selectFilteredCardCount = createSelector(
    [selectFilteredCards],
    (filteredCards) => filteredCards.length
);