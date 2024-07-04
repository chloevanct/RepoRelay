import { Flex, Text, Heading } from '@chakra-ui/react'


export default function ProjectContributors({ project }) {
    return(
        <Flex align='center' justify='flex-start' mb='2'>
            <Heading size='md'>Contributors:</Heading>
            <Text fontWeight='bold' ml='2'>{project.projectOwner}</Text>
            {project.pastContributors.map((contributor, index) => (
                <Text key={index} ml='2'> {contributor}</Text>
            ))}
            {project.subscribedUsers.map((user, index) => (
                <Text key={index} ml='2'> {user}</Text>
            ))}
        </Flex>
    )
}