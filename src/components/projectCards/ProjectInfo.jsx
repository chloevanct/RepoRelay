import { Heading, Text, Flex } from '@chakra-ui/react'

export default function ProjectInfo({ project }) {
    return (
        <Flex direction='column' align='flex-start' w={['60%', '70%']} pr={['5px', '10px']}>
            <Heading size={['xs', 'sm', 'md', 'lg']} mr='auto'>{project.projectName}</Heading>
            <Flex gap={['5px', '10px', '20px']}>
                <Text>Posted: {new Date(project.postedDate).toLocaleDateString()}</Text>
                <Text>Last activity: {new Date(project.lastActivityDate).toLocaleDateString()}</Text>
            </Flex>
            <Text maxWidth='100%' align='left' overflow='scroll'>{project.projectDescription}</Text>
        </Flex>
    )
}