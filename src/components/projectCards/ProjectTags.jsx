import { UnorderedList, Flex, ListItem } from '@chakra-ui/react'
import { projectColorMapping, technologyColorMapping } from '../../utils/tagColorMappings'
import Tag from '../Tag'

export default function ProjectTags({ card }) {
    return (
        <Flex flex='3' >
            <UnorderedList listStyleType='none' display='flex' flexWrap='wrap' gap='10px' alignItems='flex-start' justifyContent='flex-start' alignContent='flex-start'>
                {card.projectTags.map((tag, index) => (
                    <ListItem key={index}>
                        <Tag tagName={tag} colorMapping={projectColorMapping}/>
                    </ListItem>
                ))}
                {card.techTags.map((tag, index) => (
                    <ListItem key={index}>
                        <Tag tagName={tag} colorMapping={technologyColorMapping}/>
                    </ListItem>
                ))}
            </UnorderedList>
        </Flex>
    )
}


