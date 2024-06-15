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
        'AI Development', "AgriTech", "AR/VR Development",
        "Automotive Tech",
        "Backend",
        "Big Data",
        "Blockchain",
        "Cloud Computing",
        "Cybersecurity",
        "Big Data",
        "Blockchain",
        "Cloud Computing",
        "Cybersecurity"
    ],
    techTags: [
        'Python',
        "Angular",
	    "Assembly",
	    "C",
	    "C++",
	    "CSharp",
	    "COBOL",
	    "CSS",
	    "Django",
	    "Flask",
	    "Go",
	    "Haskell",
	    "HTML",
	    "Java",
	    "JavaScript",
    ]
}

export default function ProjectTags({ card }) {
    return (
        <Flex direction='column' mb='10px'>
            <Flex align='flex-start' justify='flex-start'>
                <Flex width='10%'>
                    <Heading size='md' pt='9px'>Difficulty: </Heading>
                </Flex>
                <Flex width='90%'>
                    <Tag tagName={sampleCard.difficultyTags[0]} colorMapping={difficultyColorMapping}></Tag>
                </Flex>
            </Flex>
            <Flex align='flex-start' justify='flex-start'>
                <Flex width='10%'>
                    <Heading size='md' pt='9px' whiteSpace='noWrap'>Project Tags: </Heading>
                </Flex>
                <Flex width='90%' style={{whiteSpace: "nowrap"}} flexWrap='wrap'>
                    {sampleCard.projectTags.map((projectTag) => 
                        <Tag key={projectTag} tagName={projectTag} colorMapping={projectColorMapping}></Tag>
                        )}
                </Flex>
            </Flex>
            <Flex align='flex-start' justify='flex-start'>
                <Flex width='10%'>
                    <Heading size='md' pt='9px'>Technology: </Heading>
                </Flex>
                <Flex width='90%' style={{whiteSpace: "nowrap"}} flexWrap='wrap'>
                    {sampleCard.techTags.map((techTag) => 
                        <Tag key={techTag} tagName={techTag} colorMapping={technologyColorMapping}></Tag>
                        )}
                </Flex>
            </Flex>
        </Flex>
    )
}