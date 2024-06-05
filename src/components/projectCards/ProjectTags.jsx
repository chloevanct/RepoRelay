import { UnorderedList, Flex, ListItem } from '@chakra-ui/react'
import SkillTag from '../SkillTag'

export default function ProjectTags({ card }) {
    return (
        <Flex flex='3'>
            <UnorderedList listStyleType='none' display='flex' gap='10px' alignItems='flex-start' justifyContent='flex-start'>
                {card.projectTags.map((tag, index) => (
                    <ListItem key={index}>
                        <SkillTag skill={tag} />
                    </ListItem>
                ))}
            </UnorderedList>
        </Flex>
    )
}


