[![Node.js CI](https://github.com/ubc-cpsc455-2024S/project-03_the_innovators/actions/workflows/node.js.yml/badge.svg)](https://github.com/ubc-cpsc455-2024S/project-03_the_innovators/actions/workflows/node.js.yml)

# Group 3 - Innovators

## 1.0 Project Executive Summary

Repo Relay is a web app that connects developers looking to collaborate on unfinished coding projects. It provides a platform for users to publish, find, and contribute to projects, enhancing their technical skills, expanding their portfolios, and fostering a collaborative coding community.

### Opening the Project

Deployed Repo Relay can be accessed on this [Render server](https://project-03-the-innovators-d7ya.onrender.com/)

Please note that the application is hosted on Render's free tier, so it might take a few minutes to load.

Since this app requires GitHub for project sharing and authentication, we've provided a test GitHub account for login:
- Username: Repo-Relay
- Password: reporelay1996

We recommend authenticating using the test account in incognito mode to prevent logging in with your current GitHub account.




## 2.0 Project Goals

### 2.1 Minimal Goals
1. :white_check_mark: As a user, I want to create a profile where I can identify my project preferences and technology skills, enabling me to have an identity and interact with the platform.
2. :white_check_mark: As a programmer with an unfinished coding project, I want to post a new project with all required information (project name, description, tasks completed, tasks remaining, tech stack, and difficulty level), making my project available for other community members to view and contribute to.
3. :white_check_mark: As a programmer looking to tackle a new project, I want to view all available projects in the database, so I can easily find and choose projects I want to contribute to.
4. :white_check_mark: As a project contributor, I want to update project information (project name, description, tasks completed, tasks remaining, tech stack, and difficulty level) as the project progresses, so that it accurately reflects the project state.
5. :white_check_mark: As a project contributor, I want to delete an existing project when it is no longer feasible to work on, ensuring other community members don't accidentally contribute to it.

### 2.2 Standard Goals
1. :white_check_mark: As a user, I want to be able to search and filter projects based on various criteria, so that I can quickly locate projects that match my interests and skills.
2. :white_check_mark: As a project contributor, I want to be able to subscribe to projects I am interested in or intend to contribute to, so that these projects are tracked in my profile for better organization and follow-up.
3. :white_check_mark: As a user, I want to be able to use a colorful tag/hashtag system for categorizing work completed, work to complete, technologies used, and expected difficulty, so that I can rapidly visually identify key project characteristics.
4. :white_check_mark: As a contributor, I want to be able to chat with other people working on the same project, so that I can facilitate communication and collaboration.
5. :white_check_mark: As a user, I want to be able to authenticate with GitHub using the GitHub API so that I can streamline the login process.

### 2.3 Stretch Goals
1. :white_check_mark: As a project contributor, I want to receive machine learning generated project recommendations based on my interests, profile information, and past contributions, so that I can easily find new projects that align with my preferences and skills.
2. :x: As a project owner or contributor, I want to host code files directly on the website, so that I can easily collaborate and manage project files without relying on external services.
3. :x: As a project contributor, I want to interact with gamification elements such as badges, leaderboards, and achievement tracking, so that I can be motivated and encouraged to participate more actively in the community.


## 3.0 Tech Stack
- MongoDB: Stores information about projects and users, including project details (name, tasks, tags, URL, owner, subscribed users) and user data (preferences, owned and subscribed projects, GitHub name). Projects include an embedded comments structure, and we also maintain a list of recommended projects for each user.
- React: Used for the frontend to display projects and authentication processes. We manage state with Redux, including server data and authentication status, and utilize Chakra UI for styling components.
- Node.js & Express: Powers the backend, handling API requests and server-side logic. It manages GitHub API authentication, project and user data operations, and uses Mongoose for database interactions. The server also sends out email notification to a project owner when a user subscribes to the project or when a unsubscribes.  
- GitHub Actions: Automates testing and deployment processes. It runs Node.js tests and checks the build status of our web app upon push or pull request events to the final_project branch, ensuring code integrity and readiness for deployment.
- Deployment on Render: We deployed our application using two separate instances on Render: one for the React frontend and another for the Node.js server. This setup ensures scalable, reliable access to both the client and server components of our application.


## 4.0 Above and Beyond Functionality Description
Our project includes an advanced feature that goes beyond the course requirements: a recommender system built using Python and scikit-learn. This system suggests projects to users based on their preferences, utilizing unsupervised machine learning techniques. We implemented a TF-IDF vectorization approach combined with cosine similarity to assess the similarity between user preferences and project characteristics. The process involves vectorizing the text associated with project tags and user preferences and then calculating similarity scores to generate personalized recommendations.

To refine the recommendations, we filter out projects that the users already own or are subscribed to. This ensures that the recommendations are relevant and novel. Although the recommendation process is currently run manually, we aim to deploy it as a scalable ML pipeline, automating data retrieval, processing, and updating recommendations in our MongoDB database. This future deployment will streamline the recommendation updates and enhance the overall user experience by keeping suggestions fresh and aligned with users' evolving interests.


## 5.0 Next Steps
1. Deployment of Machine Learning Model: Our current recommendation system operates manually. The next step is to deploy this machine learning model as an automated pipeline, ensuring that project recommendations are updated dynamically as new data comes in. This will enhance the accuracy and timeliness of the recommendations.

2. Supervised Machine Learning Integration: As we collect more user and project data, we aim to transition from our current unsupervised learning approach to supervised learning. This shift will enable us to better tailor recommendations based on user interactions and feedback, ultimately improving the relevance of suggested projects.

3. Gamification Elements: We plan to introduce gamification features such as badges, leaderboards, and achievement tracking. These elements will provide motivation and encouragement for contributors, fostering a more engaged and active community. This feature will recognize user contributions and achievements, enhancing their overall experience on the platform.



## 6.0 List of Contributions

### 6.1 Nariman Muldashev
- **User Backend:** Implemented user related logic on the server backend with frontend integrations including GitHub authentication (GitHub OAuth app), updating user preferences, profile creation, fetching user information from database and GitHub
- **Project Recommender:** Implemented and deployed the recommender system on the backend by building an unsupervised machine learning to estimate cosine similarity between user preferences and list of available projects
- **Deployment:** Deployed both backend node.js Express server and React application on a hosted Render server by creating confuring deployment instances and environment variables

### 6.2 Alexander Proskiw
- **Frontend Development:** Designed and developed key pages and components including Project Tags, Project Creation Form, User Profile Page, User Login Page, Detailed Project Detail Page, and the Homepage for recommended, owned, and subscribed projects.
- **Redux State Management and API Integration:** Integrated state management for projects (adding, editing, and deleting) and users (adding, editing) into the appropriate frontend components. Refactored frontend logic, thunks, and backend API endpoints to ensure consistent state management for users and projects.
- **Detailed User Functionality:** Implemented functionality and visibility for components/buttons based on user status (unsubscribed users, subscribed users, and project owners). Added ability to log out and log in with different accounts.


### 6.3 Chloe Van
- **Example:** Example description

### 6.4 Kai Groden-Gilchrist
- **Frontend Logic:** Designed and developed frontend systems including the initial redux integration, filtering and pagination for displayed project cards, and the comments system on projects.
- **Backend Integration:** Connected frontend components and redux state with backend APIs, facilitating client-server communication with error handling and state management to ensure robust and reliable data fetching and updating.
- **Code Maintenance:** Updated docstrings, code style, refactored for code maintainability, and ensured sanitization of db inputs throughout the project.
