import Header from '../components/Header'
import DetailedProjectInfo from '../components/projectDetails/DetailedProjectInfo'
import CommentsSection from '../components/projectDetails/CommentsSection'
import { Divider } from '@chakra-ui/react'

// Temp card for testing
const card = {
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

export default function ProjectDetailsPage() {

    return (
        <>
            <Header />
            <DetailedProjectInfo card={card} />
            <Divider />
            <CommentsSection card={card} />
        </>
    )
}