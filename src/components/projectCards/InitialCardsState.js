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
            difficultyTags: [
                'Advanced'
            ],
            projectTags: [
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
            difficultyTags: [
                'Beginner'
            ],
            projectTags: [
                'Frontend'
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
            difficultyTags: [
                'Intermediate'
            ],
            projectTags: [
                "Social Media"
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
            difficultyTags: [
                'Beginner'
            ],
            projectTags: [
                'Full Stack'
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
            difficultyTags: [
                'Advanced'
            ],
            projectTags: [
                'Backend'
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
            difficultyTags: [
                'Intermediate'
            ],
            projectTags: [
                'DevOps'
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
            difficultyTags: [
                'Advanced'
            ],
            projectTags: [
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
            difficultyTags: [
                'Advanced'
            ],
            projectTags: [
                'Cloud Computing'
            ],
            techTags: [
                'JavaScript',
                'React'
            ]
        }
    ],
    filters: {
        difficultyTags: [],
        projectTags: [],
        techTags: []
    },
    searchQuery: '',
}

export default initialCardsState