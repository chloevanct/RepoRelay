// Temp cards list for testing until backend is setup
// Later replaced by API call to DB
const initialCardsState = {
    cards: [
        {
            projectName: "Project 1",
            projectImg: "https://hips.hearstapps.com/hmg-prod/images/cute-photos-of-cats-looking-at-camera-1593184780.jpg",
            postedBy: "username123",
            postedDate: "2024-05-10",
            lastActivityDate: "2024-05-10",
            projectDescription: "This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot.",
            projectTags: [
                'Advanced',
                'AI Development'
            ],
            techTags: [
                'Python'
            ]
        },
        {
            projectName: "Project 2",
            projectImg: "https://media.istockphoto.com/id/1402854418/photo/kitten-with-a-ball.jpg?s=612x612&w=0&k=20&c=-TyFSMp_RKa5sNs0eI5wq2WEdqn4tsvW0tyMTpOsybI=",
            postedBy: "username000",
            postedDate: "2024-05-09",
            lastActivityDate: "2024-05-09",
            projectDescription: "Another project desc",
            projectTags: [
                'Beginner'
            ],
            techTags: [
                'JavaScript',
                'React'
            ]
        },
        {
            projectName: "Project 3",
            projectImg: "",
            postedBy: "username123",
            postedDate: "2024-05-10",
            lastActivityDate: "2024-05-10",
            projectDescription: "This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot.",
            projectTags: [
                'Intermediate',
                "Web Dev"
            ],
            techTags: [
                'JavaScript',
                'React'
            ]
        },
        {
            projectName: "Project 4",
            projectImg: "",
            postedBy: "username123",
            postedDate: "2024-05-10",
            lastActivityDate: "2024-05-10",
            projectDescription: "This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot.",
            projectTags: [
                'Beginner'
            ],
            techTags: [
                'React'
            ]
        },
        {
            projectName: "Project 5",
            projectImg: "",
            postedBy: "username123",
            postedDate: "2024-05-10",
            lastActivityDate: "2024-05-10",
            projectDescription: "This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot.",
            projectTags: [
                'Advanced'
            ],
            techTags: [
                'Python'
            ]
        },
        {
            projectName: "Project 6",
            projectImg: "",
            postedBy: "username123",
            postedDate: "2024-05-10",
            lastActivityDate: "2024-05-10",
            projectDescription: "This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot.",
            projectTags: [
                'Intermediate',
                'Automation'
            ],
            techTags: [
                'Python'
            ]
        },
        {
            projectName: "Project 7",
            projectImg: "",
            postedBy: "username123",
            postedDate: "2024-05-10",
            lastActivityDate: "2024-05-10",
            projectDescription: "This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot.",
            projectTags: [
                'Advanced',
                'AI Development'
            ],
            techTags: [
                'Python'
            ]
        },
        {
            projectName: "Project 8",
            projectImg: "",
            postedBy: "username123",
            postedDate: "2024-05-10",
            lastActivityDate: "2024-05-10",
            projectDescription: "This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot.",
            projectTags: [
                'Advanced'
            ],
            techTags: [
                'JavaScript',
                'React'
            ]
        }
    ],
    filters: {
        projectTags: [],
        techTags: []
    },
    searchQuery: '',
}

export default initialCardsState