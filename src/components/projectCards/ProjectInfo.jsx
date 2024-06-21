import { Heading, Text, Flex } from '@chakra-ui/react'

export default function ProjectInfo({ project }) {
    return (
        <Flex direction='column' align='flex-start' flex='7' pr='10px'>
            <Flex width='100%' gap='50px'>
                <Heading size='md'>{project.projectName}</Heading>
                <Text ml='auto'>{project.projectOwner}</Text>
            </Flex>
            <Flex gap='20px'>
                <Text>Posted: {project.postedDate}</Text>
                <Text>Last activity: {project.lastActivityDate}</Text>
            </Flex>
            <Text maxWidth='100%' noOfLines={3} align='left'>{project.projectDescription}</Text>
        </Flex>
    )
}