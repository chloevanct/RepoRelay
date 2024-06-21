import { configureStore } from '@reduxjs/toolkit';
import projectSlice from './projects/projectSlice';
import userSlice from './user/userSlice';

const store = configureStore({
    reducer: {
        projects: projectSlice,
        user: userSlice
    },
    devTools: true
});

export default store;
