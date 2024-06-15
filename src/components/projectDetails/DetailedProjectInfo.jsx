import ProjectImage from '../projectCards/ProjectImage'
import ProjectInfo from '../projectCards/ProjectInfo'
import ProjectTags from './ProjectTags'
import ProjectProgress from './ProjectProgress'
import { Flex, Divider } from '@chakra-ui/react'

export default function DetailedProjectInfo({ card }) {
    return (
        <Flex pl='10px' pr='20px' direction='column'>
            <Flex>
                <ProjectImage card={card} />
                <ProjectInfo card={card} />
            </Flex>
            <Divider mb='10px'/>
            <ProjectTags card={card} mb='10px'/>
            <Divider mb='10px'/>
            <ProjectProgress card={card} />
        </Flex>
    )
}