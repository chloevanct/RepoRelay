import ProjectImage from './ProjectImage'
import ProjectInfo from './ProjectInfo'
import ProjectTags from './ProjectTags'
import { Link } from "react-router-dom";
import { Flex, Divider, Box } from '@chakra-ui/react'

export default function ProjectCard({ project }) {
    return (
        <Link to={`/projectDetails/${project.projectID}`}>
            <Flex alignItems='center' justifyContent='flex-start' borderWidth="2px" borderRadius="lg" p='5px' m='10px' bg="gray.50" color='black' h='auto'>  
                <ProjectImage project={project} />
                <Flex direction='column' width='80%' height='100%'>
                    <Flex height='150px'>
                        <ProjectInfo project={project} />
                        <Divider orientation='vertical' borderColor='gray.400'/>
                        <ProjectTags project={project}/>
                    </Flex>
                </Flex>
            </Flex>
        </Link>
    )
}