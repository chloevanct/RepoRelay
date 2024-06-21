import { TASK_STATUS_PENDING, TASK_STATUS_COMPLETE } from "../../utils/Task"

// Temp cards list for testing until backend is setup
// Later replaced by API call to DB
const initialCardsState = {
    cards: [
        {
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
    ],
    filters: {
        difficultyTag: '',
        projectTags: [],
        techTags: []
    },
    searchQuery: '',
}

export default initialCardsState