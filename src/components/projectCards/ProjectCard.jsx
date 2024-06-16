import ProjectImage from './ProjectImage'
import ProjectInfo from './ProjectInfo'
import ProjectTags from './ProjectTags'
import { Link } from "react-router-dom";
import { Flex, Divider, Box } from '@chakra-ui/react'

export default function ProjectCard({ project }) {
    return (
        <Link to='/projectDetails'>
            <Flex border='1px solid' alignItems='center' justifyContent='flex-start' padding='10px' margin='10px' backgroundColor='#f8f4fc' color='black' height='16%'>  
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