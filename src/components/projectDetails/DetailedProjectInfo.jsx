import ProjectImage from '../projectCards/ProjectImage'
import ProjectInfo from '../projectCards/ProjectInfo'
import ProjectProgress from './ProjectProgress'
import { Flex, Divider } from '@chakra-ui/react'

export default function DetailedProjectInfo({ card }) {
    return (
        <Flex pl='10px' pr='20px' direction='column'>
            <Flex>
                <ProjectImage card={card} />
                <ProjectInfo card={card} />
            </Flex>

            <ProjectProgress card={card} />
        </Flex>
    )
}