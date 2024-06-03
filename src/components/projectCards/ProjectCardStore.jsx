import { createSlice, configureStore } from '@reduxjs/toolkit'
import SkillTag from '../SkillTag'

// Temp cards list for testing until backend is setup
const cards = [
    {
        projectName: "Project 1",
        projectImg: "https://hips.hearstapps.com/hmg-prod/images/cute-photos-of-cats-looking-at-camera-1593184780.jpg",
        postedBy: "username123",
        postedDate: "2024-05-10",
        lastActivityDate: "2024-05-10",
        projectDescription: "This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot. This really long description gets cut off and ends in a dot dot dot.",
        projectTags: [
            <SkillTag skill='Python'></SkillTag>,
            <SkillTag skill='JavaScript'></SkillTag>
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
            <SkillTag skill='Python'></SkillTag>,
            <SkillTag skill='JavaScript'></SkillTag>
        ]
    }
]


const cardSlice = createSlice({
    name: 'cards',
    initialState: cards,
    reducers: {
      addCard: (state, action) => {
        state.push(action.payload);
      }
    }
  })

const store = configureStore({
    reducer: {
        cards: cardSlice.reducer
    }
})

export const { addMember } = cardSlice.actions
export default store;
