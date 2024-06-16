import Header from '../components/Header'
import DetailedProjectInfo from '../components/projectDetails/DetailedProjectInfo'
import CommentsSection from '../components/projectDetails/CommentsSection'
import Comment from '../utils/Comment'
import Task, { TASK_STATUS_PENDING, TASK_STATUS_COMPLETE } from '../utils/Task'
import { Divider } from '@chakra-ui/react'

// Temp user for testing
const user = {
    userID: "username123",
    githubUsername: "username123",
    password: "password",
    ownedProjects: ['1'],
    subscribedProjects: ['1'],
    firstName: "John",
    lastName: "Doe",
    userImage: "",
    emailAddress: "",
    preferences: {
        difficultyTags: ["Beginner", "Intermediate"],
        projectTags: ["AI Development", "Machine Learning"],
        techTags: ["Python", "Java", "JavaScript"]
    }
}

// Temp project for testing
const project = {
    projectID: "1",
    projectName: "Project 1",
    projectDescription: "This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot.",
    projectImg: "https://hips.hearstapps.com/hmg-prod/images/cute-photos-of-cats-looking-at-camera-1593184780.jpg",
    githubURL: "https://github.com/",
    projectOwner: "username123",
    pastContributors: ["username321", "username444"],
    subscribedUsers: ["username123", "username321"], // Project needs to know who subs to it?
    postedDate: "2024-05-10",
    lastActivityDate: "2024-05-10",
    difficultyTag: 'Advanced',
    projectTags: [
        'AI Development', 
        "AgriTech", 
        "AR/VR Development",
        "Automotive Tech",
        "Backend",
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
    ],
    tasks: [
        { postedBy: "username123", datePosted: "2024-05-10", taskBody: "A pending task", taskStatus: TASK_STATUS_PENDING },
        { postedBy: "username123", datePosted: "2024-05-10", taskBody: "Another pending task", taskStatus: TASK_STATUS_PENDING },
        { postedBy: "username123", datePosted: "2024-05-10", taskBody: "A complete task", taskStatus: TASK_STATUS_COMPLETE },
        { postedBy: "username123", datePosted: "2024-05-10", taskBody: "Another complete task", taskStatus: TASK_STATUS_COMPLETE }
    ],
    comments: [
        { postedBy: "username321", datePosted: "2024-05-09", taskBody: "This is the best project I've ever seen!" },
        { postedBy: "username444", datePosted: "2024-05-07", taskBody: "This is the worst project I've ever seen! Who taught you to code?" }
    ]
}

export default function ProjectDetailsPage() {

    return (
        <>
            <Header />
            <DetailedProjectInfo project={project} />
            <Divider />
            <CommentsSection project={project} />
        </>
    )
}