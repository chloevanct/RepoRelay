import { useSelector, useDispatch } from 'react-redux';
import ProjectCard from './ProjectCard';
import { UnorderedList, ListItem } from '@chakra-ui/react'

/* Filters the cards from the redux store that match the active filters
 *   Both the cards and active filters are contained within the state 
 *    and managed by the ProjectCardStore
 * Currently displays any card that matches any (at least one) of the active filters.
 *   TODO: Discuss -- is the logic we want?
**/
const selectFilteredCards = (state) => {
    const cards = state.cards.cards
    const projectFilters = state.cards.filters.projectTags
    const techFilters = state.cards.filters.techTags
    console.log(projectFilters, techFilters)

    const searchQuery = state.cards.searchQuery.toLowerCase()

    if (!projectFilters.length && !techFilters.length && !searchQuery) return cards

    // TODO: search other project keys?
    // TODO: change .some to .every if we want filtering to only show cards if it matches ALL active project and tech filters and the search query if provided
    // empty state defaults to true
    return cards.filter((card) => {
        const matchesSearchQuery = card.projectName.toLowerCase().includes(searchQuery) ||
                                   card.projectDescription.toLowerCase().includes(searchQuery)

        const matchesProjectFilters = projectFilters.length === 0 ||
                                      projectFilters.some((filterTag) => card.projectTags.includes(filterTag))

        const matchesTechFilters = techFilters.length === 0 ||
                                   techFilters.some((filterTag) => card.techTags.includes(filterTag))

        return matchesSearchQuery && matchesProjectFilters && matchesTechFilters
    })
}

// TODO: Once there are more cards available, will need to add some logic to only display certain ones.
//   Click through multiple pages with 10 cards each or something?
export default function ProjectCards() {
    const displayedCards = useSelector(selectFilteredCards);

    // PROBABLY ADD SORTING LOGIC HERE

    return (
        <>
            <UnorderedList listStyleType='none'>
                {displayedCards.map((card, index) => (
                    <ListItem key={index}>
                        <ProjectCard card={card}></ProjectCard>
                    </ListItem>
                ))}
            </UnorderedList>
        </>
    )
}