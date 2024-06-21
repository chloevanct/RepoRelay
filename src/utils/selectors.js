import { createSelector } from 'reselect';

// Selector to get the list of projects from the state
const selectProjects = (state) => state.projects.projects;
// Selector to get the filters from the state
const selectFilters = (state) => state.projects.filters;
// Selector to get the search query from the state and convert it to lowercase
const selectSearchQuery = (state) => state.projects.searchQuery.toLowerCase();

// Selector to get the filtered list of projects based on the search query and filters
export const selectFilteredProjects = createSelector(
    [selectProjects, selectFilters, selectSearchQuery],
    (projects, filters, searchQuery) => {
        // Destructure the filters for difficulty, project, and tech tags
        const { difficultyTag = "", projectTags = [], techTags = [] } = filters;

        // Filter the projects based on the search query and filters
        return projects.filter((project) => {
            // Check if the project matches the search query in project name or description
            const matchesSearchQuery = project.projectName.toLowerCase().includes(searchQuery) ||
            project.projectDescription.toLowerCase().includes(searchQuery);

            // Check if the project matches all selected difficulty filters (or if no filters are selected)
            const matchesDifficultyFilters = difficultyTag === "" || 
                                             difficultyTag === project.difficultyTag;

            // Check if the project matches all selected project filters (or if no filters are selected)
            const matchesProjectFilters = projectTags.length === 0 ||
                                          projectTags.every((filterTag) => project.projectTags.includes(filterTag));

            // Check if the project matches all selected tech filters (or if no filters are selected)
            const matchesTechFilters = techTags.length === 0 ||
                                       techTags.every((filterTag) => project.techTags.includes(filterTag));

            // Return true if the project matches the search query and all filters
            return matchesSearchQuery && matchesDifficultyFilters && matchesProjectFilters && matchesTechFilters;
        });
    }
);

// Selector to get the count of the filtered projects
export const selectFilteredProjectCount = createSelector(
    [selectFilteredProjects],
    (filteredProjects) => filteredProjects.length
);