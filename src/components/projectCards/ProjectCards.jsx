import { useSelector } from 'react-redux';
import ProjectCard from './ProjectCard';
import './ProjectCards.css'

export default function ProjectCards() {
    const cards = useSelector((state) => state.cards)

    return (
        <>
            <ul id="projectCards">
                {cards.map((card, index) => (
                <li key={index}>
                    <ProjectCard card={card}></ProjectCard>
                </li>
                ))}
            </ul>
        </>
    )
}