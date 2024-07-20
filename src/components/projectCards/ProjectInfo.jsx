import { Heading, Text, Flex } from '@chakra-ui/react'

export default function ProjectInfo({ project }) {
    return (
        <Flex direction='column' align='flex-start' w={['60%', '70%']} pr={['5px', '10px']}>
            <Heading size={['xs', 'sm', 'md', 'lg']} mr='auto' textAlign='left'>{project.projectName}</Heading>
            <Flex display={['none', 'flex']} gap='30px'>
                <Text>Posted: {new Date(project.postedDate).toLocaleDateString()}</Text>
                <Text>Last activity: {new Date(project.lastActivityDate).toLocaleDateString()}</Text>
            </Flex>
            <Text maxWidth='100%' align='left' noOfLines='3' fontSize={['0.6rem', '0.6rem', '1.2rem']}>{project.projectDescription}</Text>
        </Flex>
    )
}