import { useSelector } from 'react-redux';
import ProjectCard from './ProjectCard';
import { UnorderedList, ListItem } from '@chakra-ui/react'

export default function ProjectCards() {
    const cards = useSelector((state) => state.cards)

    return (
        <>
            <UnorderedList listStyleType='none'>
                {cards.map((card, index) => (
                <ListItem key={index}>
                    <ProjectCard card={card}></ProjectCard>
                </ListItem>
                ))}
            </UnorderedList>
        </>
    )
}