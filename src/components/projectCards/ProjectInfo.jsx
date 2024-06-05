import { Heading, Text, Flex } from '@chakra-ui/react'

export default function ProjectInfo({ card }) {
    return (
        <Flex direction='column' align='flex-start' flex='7' pr='10px'>
            <Flex width='100%' gap='50px'>
                <Heading size='md'>{card.projectName}</Heading>
                <Text ml='auto'>{card.postedBy}</Text>
            </Flex>
            <Flex gap='20px'>
                <Text>Posted: {card.postedDate}</Text>
                <Text>Last activity: {card.lastActivityDate}</Text>
            </Flex>
            <Text maxWidth='100%' noOfLines={3} align='left'>{card.projectDescription}</Text>
        </Flex>
    )
}