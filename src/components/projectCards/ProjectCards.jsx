import { useSelector, useDispatch } from 'react-redux';
import ProjectCard from './ProjectCard';
import { UnorderedList, ListItem, Flex, Button, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

const CARDS_PER_PAGE = 5;

/* Filters the cards from the redux store that match the active filters
 *   Both the cards and active filters are contained within the state 
 *    and managed by the ProjectCardStore
 * Currently displays any card that matches ALL of the active filters.
**/
const selectFilteredCards = (state) => {
    const cards = state.cards.cards
    const projectFilters = state.cards.filters.projectTags
    const techFilters = state.cards.filters.techTags

    const searchQuery = state.cards.searchQuery.toLowerCase()

    if (!projectFilters.length && !techFilters.length && !searchQuery) return cards

    // TODO: search other project keys?
    return cards.filter((card) => {
        const matchesSearchQuery = card.projectName.toLowerCase().includes(searchQuery) ||
                                   card.projectDescription.toLowerCase().includes(searchQuery)

        const matchesProjectFilters = projectFilters.length === 0 ||
                                      projectFilters.every((filterTag) => card.projectTags.includes(filterTag))

        const matchesTechFilters = techFilters.length === 0 ||
                                   techFilters.every((filterTag) => card.techTags.includes(filterTag))

        return matchesSearchQuery && matchesProjectFilters && matchesTechFilters
    })
}


export default function ProjectCards() {
    const displayedCards = useSelector(selectFilteredCards);

    // **PROBABLY ADD SORTING LOGIC HERE**

    // Page navigation logic adapted from Google Gemini code (June 6, 2024).
    // Query: how do I adjust my project cards to display 5 at a time with 
    //        multiple pages to scroll through if there's more than 5?
    const hasResults = displayedCards.length > 0; 
    const maxPage = Math.ceil(displayedCards.length / CARDS_PER_PAGE);

    const [currPage, setCurrPage] = useState(1)
    const currPageCards = displayedCards.slice(
        (currPage - 1) * CARDS_PER_PAGE,
        currPage * CARDS_PER_PAGE
    )

    const pageChange = (pageNumber) => {
        setCurrPage(pageNumber)
    }

    return (
        <>    
            {/* Added a warning for when there are no projects to display */}
            {currPageCards.length === 0 ? (
                currPage === 1 ? (
                    <Text pt='20px'>Oops! We don't have any projects matching those filters.</Text>
                ) : (
                    setCurrPage(1)
                )
            ) : (
                <UnorderedList listStyleType='none'>
                {currPageCards.map((card, index) => (
                    <ListItem key={index}>
                        <ProjectCard card={card}></ProjectCard>
                    </ListItem>
                ))}
                </UnorderedList>
            )}

            { hasResults && (
                <Flex align='center' justify='center'>
                    <Button
                        variant='link'
                        size='sm'
                        _hover={{ textDecoration: 'none' }}
                        color='blue'
                        padding='10px'
                        onClick={() => pageChange(currPage - 1)} 
                        disabled={currPage <= 1}
                        opacity={currPage <= 1 ? 0 : 1} 
                        pointerEvents={currPage <= 1 ? 'none' : 'auto'} 
                    >
                        PREVIOUS
                    </Button>

                    <Text>Page {currPage} of {maxPage}</Text>

                    <Button
                        variant='link'
                        size='sm'
                        _hover={{ textDecoration: 'none' }}
                        color='blue'
                        padding='10px'
                        onClick={() => pageChange(currPage + 1)} 
                        disabled={currPage >= maxPage}
                        opacity={currPage >= maxPage ? 0 : 1} 
                        pointerEvents={currPage >= maxPage ? 'none' : 'auto'} 
                    >
                        NEXT
                    </Button>
                </Flex>
            )}

        </>
    )
}