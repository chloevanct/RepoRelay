import Tag from '../Tag'
import { difficultyColorMapping, projectColorMapping, technologyColorMapping } from '../../utils/tagColorMappings'
import { Flex, Heading } from '@chakra-ui/react'

const sampleCard = {
    projectName: "Project 1",
    projectImg: "https://hips.hearstapps.com/hmg-prod/images/cute-photos-of-cats-looking-at-camera-1593184780.jpg",
    postedBy: "username123",
    postedDate: "2024-05-10",
    lastActivityDate: "2024-05-10",
    projectDescription: "This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot.",
    difficultyTags: [
        'Advanced'
    ],
    projectTags: [
        'AI Development'
    ],
    techTags: [
        'Python'
    ]
}

export default function ProjectTags({ card }) {
    return (
        <Flex direction='column'>
            <Flex align='center'>
                <Heading size='md'>Difficulty: </Heading>
                    <Tag tagName={sampleCard.difficultyTags[0]} colorMapping={difficultyColorMapping}></Tag>
            </Flex>
            <Flex align='center'>
                <Heading size='md'>Project Tags: </Heading>
                {sampleCard.projectTags.map((projectTag) => 
                    <Tag key={projectTag} tagName={projectTag} colorMapping={projectColorMapping}></Tag>
                    )}
            </Flex>
            <Flex align='center'>
                <Heading size='md'>Technology: </Heading>
                {sampleCard.techTags.map((techTag) => 
                    <Tag key={techTag} tagName={techTag} colorMapping={technologyColorMapping}></Tag>
                    )}
            </Flex>
        </Flex>
    )
}