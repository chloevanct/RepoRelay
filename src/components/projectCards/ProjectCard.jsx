import { Heading, Text, UnorderedList, Flex, ListItem } from '@chakra-ui/react'
import ProjectImage from './ProjectImage'

export default function ProjectCard({card}) {
    return (
        <Flex border='1px solid' alignItems='center' justifyContent='flex-start' padding='10px' margin='10px' backgroundColor='#f8f4fc' color='black' height='14vh'>  
            <ProjectImage card={card} />
            <Flex direction='column' width='80%' height='100%'>
                <Flex height='100%'>
                    <Flex direction='column' align='flex-start' flex='7' pr='10px' borderRight='1px solid #000'>
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
                    <Flex flex='3'>
                        <UnorderedList listStyleType='none' display='flex' gap='10px' alignItems='flex-start' justifyContent='flex-start'>
                            {card.projectTags.map((tag, index) => (
                                <ListItem key={index}>{tag}</ListItem>
                            ))}
                        </UnorderedList>
                    </Flex>
                </Flex>
            </Flex>            
        </Flex>
    )
}