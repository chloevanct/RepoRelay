import { configureStore } from '@reduxjs/toolkit';
import cardSlice from './projects/projectCardSlice';
import userSlice from './user/userSlice';

const store = configureStore({
    reducer: {
        cards: cardSlice,
        user: userSlice
    },
    devTools: true
});

export default store;
