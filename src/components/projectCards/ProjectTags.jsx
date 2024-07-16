import { UnorderedList, Flex, ListItem } from '@chakra-ui/react'
import { difficultyColorMapping, projectColorMapping, technologyColorMapping } from '../../utils/tagColorMappings'
import Tag from '../Tag'

export default function ProjectTags({ project }) {
    return (
        <Flex flex='3' >
            <UnorderedList 
                listStyleType='none' 
                display='flex' 
                flexWrap='wrap' 
                overflowY="scroll" 
                gap='10px' 
                alignItems='flex-start' 
                justifyContent='flex-start' 
                alignContent='flex-start' sx={{
                    '::-webkit-scrollbar': {
                        width: '4px'
                    },
                    '::-webkit-scrollbar-thumb': {
                        background: '#b0b0b0',
                        borderRadius: '24px'
                    }
                }}>
                <Tag tagName={project.difficultyTag} colorMapping={difficultyColorMapping}/>
                {project.projectTags.map((tag, index) => (
                    <ListItem key={index}>
                        <Tag tagName={tag} colorMapping={projectColorMapping}/>
                    </ListItem>
                ))}
                {project.techTags.map((tag, index) => (
                    <ListItem key={index}>
                        <Tag tagName={tag} colorMapping={technologyColorMapping}/>
                    </ListItem>
                ))}
            </UnorderedList>
        </Flex>
    )
}


