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
2. :white_check_mark: As a programmer with an unfinished coding project, I want to post a new project with all required information (project name, description, tasks, tech stack, and difficulty level), making my project available for other community members to view and contribute to.
3. :white_check_mark: As a programmer looking to tackle a new project, I want to view all available projects in the database, so I can easily find and choose projects I want to contribute to.
4. :white_check_mark: As a project contributor, I want to update project information (project name, description, tasks, tech stack, and difficulty level) as the project progresses, so that it accurately reflects the project state.
5. :white_check_mark: As a project contributor, I want to delete an existing project when it is no longer feasible to work on, ensuring other community members don't accidentally contribute to it.

### 2.2 Standard Goals
1. :white_check_mark: As a user, I want to be able to search and filter projects based on various criteria, so that I can quickly locate projects that match my interests and skills.
2. :white_check_mark: As a project contributor, I want to be able to subscribe to projects I am interested in or intend to contribute to, so that these projects are tracked in my profile for better organization and follow-up.
3. :white_check_mark: As a user, I want to be able to use a colorful tag/hashtag system for categorizing work completed, work to complete, technologies used, and expected difficulty, so that I can rapidly visually identify key project characteristics.
4. :white_check_mark: As a user, I want to communicate with others working on the same project to facilitate better collaboration.
5. :white_check_mark: As a user, I want to be able to authenticate with GitHub using the GitHub API so that I can streamline the login process.

### 2.3 Stretch Goals
1. :white_check_mark: As a user, I want to receive machine learning generated project recommendations based on my interests, profile information, and past contributions, so that I can easily find new projects that align with my preferences and skills.
2. :x: As a project owner or contributor, I want to host code files directly on the website, so that I can easily collaborate and manage project files without relying on external services.
3. :x: As a project contributor, I want to interact with gamification elements such as badges, leaderboards, and achievement tracking, so that I can be motivated and encouraged to participate more actively in the community.

## 3.0 Tech Stack

### 3.1 HTML, CSS, & JavaScript
- **HTML**: HTML forms the foundational structure of the project, with the `index.html` file crucial for initial setup and injecting React components. JSX, used within React, is syntactically similar to HTML and allows seamless integration of dynamic content within the markup.
  
- **CSS**: CSS is used for styling components. Chakra UI provides a comprehensive design system for consistency and responsiveness, while custom CSS allows for further customization. This combination balances ease of use and unique design.

- **JavaScript**: JavaScript is the primary language used throughout the stack, powering the UI with React/Redux on the frontend and managing server-side logic with Node.js/Express on the backend. This unified approach simplifies development compared to using multiple languages.

### 3.2 React & Redux
- **React**: React provides a component-based architecture for building reusable and maintainable UI components, such as project cards and tag components used throughout the application. The virtual DOM improves performance by minimizing direct manipulations of the actual DOM, making React more organized and scalable than traditional JavaScript or jQuery for complex user interfaces.
  
- **Redux**: Redux manages the state across the application, which is particularly useful for managing project data and authentication status. It provides a single source of truth for all areas of the application, making state management more straightforward than using plain React.

- **Chakra UI**: Chakra UI is used for styling components, offering accessible, reusable, and composable components. It provides a good balance between ease of use and customization compared to other UI frameworks.

### 3.3 Node & Express
- **Node.js & Express**: Node.js and Express power the backend, handling API requests and server-side logic efficiently. They also manage GitHub API authentication, project and user data operations, and use Mongoose for database interactions. Node.js's non-blocking, event-driven architecture is well-suited for I/O-intensive applications, and Express simplifies the creation of robust APIs.

- **Email Notifications**: The server sends email notifications to project owners when users subscribe or unsubscribe from a project, enhancing engagement and communication. Email provides a direct and reliable way to reach users compared to other notification methods.

### 3.4 MongoDB
- **MongoDB**: MongoDB stores information about projects (name, tasks, tags, URL, owner, subscribed users, comments, etc.) and users (preferences, owned and subscribed projects, GitHub name, etc.), offering a flexible schema design for complex data structures. Projects include an embedded comments structure, and we maintain a list of recommended projects for each user. MongoDB handles large volumes of unstructured data and scales easily, making it more suitable than traditional relational databases like MySQL.

### 3.5 GitHub Actions & Deployment
- **GitHub Actions**: Automates testing and deployment processes, ensuring code integrity with seamless GitHub integration. It runs Node.js tests and checks build status upon push or pull request events, simplifying the CI/CD pipeline compared to other tools.

- **Deployment on Render**: The application is deployed using two instances on Render: one for the React frontend and another for the Node.js server. Render is user-friendly and cost-effective, making it easy to scale and manage the application. While Render's free tier is convenient, it has slower spin-up times compared to paid alternatives like AWS or Heroku, which offer faster deployment options.



## 4.0 Above and Beyond Functionality Description
Our project includes an advanced feature that goes beyond the course requirements: a project recommendation system built using Python and scikit-learn. This system suggests projects to users based on their preferences, utilizing unsupervised machine learning techniques. We implemented a TF-IDF vectorization approach combined with cosine similarity to assess the similarity between user preferences and project characteristics. The process involves vectorizing the text associated with project tags and user preferences and then calculating similarity scores to generate personalized recommendations.

To refine the recommendations, we filter out projects that the users already own or are subscribed to. This ensures that the recommendations are relevant and novel. Although the recommendation process is currently run manually, we aim to deploy it as a scalable ML pipeline, automating data retrieval, processing, and updating recommendations in our MongoDB database. This future deployment will streamline updates to each user's recommended projects and enhance the overall user experience by keeping suggestions fresh and aligned with users' evolving interests.


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
- **Backend Development:** Designed and investigated the schema for projects, set up server connection to MongoDB, implemented full CRUD operations with corresponding services, thunks, and extraReducers for Projects, Comments, and Tasks, and reorganized Redux directories.
- **Emailing System:** Investigated and set up an emailing system with Mailgun to notify the project owner when a contributor joins or leaves a team, prompting updates to the GitHub repository.
- **Frontend Development:** Implemented reactive components (ProjectListHeader, SearchBarHeader), integrated search functionality with Redux, and added functionalities to the SortBy Menu (newest, oldest, most active).

### 6.4 Kai Groden-Gilchrist
- **Frontend Logic:** Designed and developed frontend systems including the initial redux integration, filtering and pagination for displayed project cards, and the comments system on projects.
- **Backend Integration:** Connected frontend components and redux state with backend APIs, facilitating client-server communication with error handling and state management to ensure robust and reliable data fetching and updating.
- **Code Maintenance:** Updated docstrings, code style, UI responsiveness, refactored for code maintainability, and ensured sanitization of db inputs throughout the project.
