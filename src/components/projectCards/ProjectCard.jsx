import ProjectImage from './ProjectImage'
import ProjectInfo from './ProjectInfo'
import ProjectTags from './ProjectTags'
import { Link } from "react-router-dom";
import { Flex, Divider, Box } from '@chakra-ui/react'

export default function ProjectCard({ card }) {

    const projectName = card.projectName

    return (
        <Link to='/projectDetails' state={{ name: {projectName} }}>
            <Flex border='1px solid' alignItems='center' justifyContent='flex-start' padding='10px' margin='10px' backgroundColor='#f8f4fc' color='black' height='16%'>  
                <ProjectImage card={card} />
                <Flex direction='column' width='80%' height='100%'>
                    <Flex height='150px'>
                        <ProjectInfo card={card} />
                        <Divider orientation='vertical' borderColor='gray.400'/>
                        <ProjectTags card={card}/>
                    </Flex>
                </Flex>
            </Flex>
        </Link>
    )
}