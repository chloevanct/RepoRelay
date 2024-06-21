export const SET_USER = 'user/setUser';
export const UPDATE_USER = 'user/updateUser';
export const UPDATE_USER_ID = 'user/updateUserID';
export const UPDATE_GITHUB_USERNAME = 'user/updateGithubUsername';
export const UPDATE_PASSWORD = 'user/updatePassword';
export const UPDATE_OWNED_PROJECTS = 'user/updateOwnedProjects';
export const UPDATE_SUBSCRIBED_PROJECTS = 'user/updateSubscribedProjects';
export const UPDATE_FIRST_NAME = 'user/updateFirstName';
export const UPDATE_LAST_NAME = 'user/updateLastName';
export const UPDATE_USER_IMAGE = 'user/updateUserImage';
export const UPDATE_EMAIL_ADDRESS = 'user/updateEmailAddress';
export const UPDATE_DIFFICULTY_TAGS = 'user/updateDifficultyTags';
export const UPDATE_PROJECT_TAGS = 'user/updateProjectTags';
export const UPDATE_TECH_TAGS = 'user/updateTechTags';

export const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

export const updateUser = (updates) => ({
    type: UPDATE_USER,
    payload: updates
});

export const updateUserID = (userID) => ({
    type: UPDATE_USER_ID,
    payload: userID
});

export const updateGithubUsername = (githubUsername) => ({
    type: UPDATE_GITHUB_USERNAME,
    payload: githubUsername
});

export const updatePassword = (password) => ({
    type: UPDATE_PASSWORD,
    payload: password
});

export const updateOwnedProjects = (ownedProjects) => ({
    type: UPDATE_OWNED_PROJECTS,
    payload: ownedProjects
});

export const updateSubscribedProjects = (subscribedProjects) => ({
    type: UPDATE_SUBSCRIBED_PROJECTS,
    payload: subscribedProjects
});

export const updateFirstName = (firstName) => ({
    type: UPDATE_FIRST_NAME,
    payload: firstName
});

export const updateLastName = (lastName) => ({
    type: UPDATE_LAST_NAME,
    payload: lastName
});

export const updateUserImage = (userImage) => ({
    type: UPDATE_USER_IMAGE,
    payload: userImage
});

export const updateEmailAddress = (emailAddress) => ({
    type: UPDATE_EMAIL_ADDRESS,
    payload: emailAddress
});

export const updateDifficultyTags = (difficultyTags) => ({
    type: UPDATE_DIFFICULTY_TAGS,
    payload: difficultyTags
});

export const updateProjectTags = (projectTags) => ({
    type: UPDATE_PROJECT_TAGS,
    payload: projectTags
});

export const updateTechTags = (techTags) => ({
    type: UPDATE_TECH_TAGS,
    payload: techTags
});
