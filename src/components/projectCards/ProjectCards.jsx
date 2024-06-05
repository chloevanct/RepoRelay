import { useSelector } from 'react-redux';
import ProjectCard from './ProjectCard';
import { UnorderedList, ListItem } from '@chakra-ui/react'


const selectFilteredCards = (state) => {
    const cards = state.cards.cards
    const filters = state.cards.filters.tags
    console.log(filters)
  
    if (!filters.length) return cards
  
    return cards.filter((card) => {
      const cardTags = card.projectTags
      return filters.every((filterTag) => cardTags.includes(filterTag))
    })
}

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