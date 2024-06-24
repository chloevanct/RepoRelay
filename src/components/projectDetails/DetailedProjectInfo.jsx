import ProjectImage from '../projectCards/ProjectImage'
import ProjectInfo from '../projectCards/ProjectInfo'
import ProjectTags from './ProjectTags'
import ProjectProgress from './ProjectProgress'
import { Flex, Divider } from '@chakra-ui/react'

export default function DetailedProjectInfo({ project }) {
    return (
        <Flex direction='column'>
            <Flex bg="gray.50" shadow="md" borderWidth="1px" borderRadius="lg" p={4}>
                <ProjectImage project={project} />
                <ProjectInfo project={project}/>
            </Flex>
            <Divider mb='10px'/>
            <ProjectTags project={project} mb='10px'/>
            <Divider mb='10px'/>
            <ProjectProgress project={project} />
        </Flex>
    )
}