import Tag from '../Tag'
import { difficultyColorMapping, projectColorMapping, technologyColorMapping } from '../../utils/tagColorMappings'
import { Flex, Heading } from '@chakra-ui/react'

export default function ProjectTags({ project }) {
    return (
        <Flex direction='column' mb='10px'>
            <Flex align='flex-start' justify='flex-start'>
                <Flex width='10%'>
                    <Heading size='md' pt='9px'>Difficulty: </Heading>
                </Flex>
                <Flex width='90%'>
                    <Tag tagName={project.difficultyTag} colorMapping={difficultyColorMapping}></Tag>
                </Flex>
            </Flex>
            <Flex align='flex-start' justify='flex-start'>
                <Flex width='10%'>
                    <Heading size='md' pt='9px' whiteSpace='noWrap'>Project Tags: </Heading>
                </Flex>
                <Flex width='90%' style={{whiteSpace: "nowrap"}} flexWrap='wrap'>
                    {project.projectTags.map((projectTag) => 
                        <Tag key={projectTag} tagName={projectTag} colorMapping={projectColorMapping}></Tag>
                        )}
                </Flex>
            </Flex>
            <Flex align='flex-start' justify='flex-start'>
                <Flex width='10%'>
                    <Heading size='md' pt='9px'>Technology: </Heading>
                </Flex>
                <Flex width='90%' style={{whiteSpace: "nowrap"}} flexWrap='wrap'>
                    {project.techTags.map((techTag) => 
                        <Tag key={techTag} tagName={techTag} colorMapping={technologyColorMapping}></Tag>
                        )}
                </Flex>
            </Flex>
        </Flex>
    )
}