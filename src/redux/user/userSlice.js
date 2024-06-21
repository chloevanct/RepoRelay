import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
    currentUser: {
        userID: "username123",
        githubUsername: "username123",
        password: "password",
        ownedProjects: ["1"],
        subscribedProjects: ["1"],
        firstName: "John",
        lastName: "Doe",
        userImage: "",
        emailAddress: "john.doe@example.com",
        preferences: {
          difficultyTags: ["Beginner"],
          projectTags: ["AI Development", "Machine Learning"],
          techTags: ["Python", "Java", "JavaScript"]
        }
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload;
        },
        updateUser: (state, action) => {
            state.currentUser = { ...state.currentUser, ...action.payload };
        },
        updateUserID: (state, action) => {
            state.currentUser.userID = action.payload;
        },
        updateGithubUsername: (state, action) => {
            state.currentUser.githubUsername = action.payload;
        },
        updatePassword: (state, action) => {
            state.currentUser.password = action.payload;
        },
        updateOwnedProjects: (state, action) => {
            state.currentUser.ownedProjects = action.payload;
        },
        updateSubscribedProjects: (state, action) => {
            state.currentUser.subscribedProjects = action.payload;
        },
        updateFirstName: (state, action) => {
            state.currentUser.firstName = action.payload;
        },
        updateLastName: (state, action) => {
            state.currentUser.lastName = action.payload;
        },
        updateUserImage: (state, action) => {
            state.currentUser.userImage = action.payload;
        },
        updateEmailAddress: (state, action) => {
            state.currentUser.emailAddress = action.payload;
        },
        updateDifficultyTags: (state, action) => {
            state.currentUser.preferences.difficultyTags = action.payload;
        },
        updateProjectTags: (state, action) => {
            state.currentUser.preferences.projectTags = action.payload;
        },
        updateTechTags: (state, action) => {
            state.currentUser.preferences.techTags = action.payload;
        }
    }
});

export const {
    setUser,
    updateUser,
    updateUserID,
    updateGithubUsername,
    updatePassword,
    updateOwnedProjects,
    updateSubscribedProjects,
    updateFirstName,
    updateLastName,
    updateUserImage,
    updateEmailAddress,
    updateDifficultyTags,
    updateProjectTags,
    updateTechTags
} = userSlice.actions;

export default userSlice.reducer;
