import { configureStore } from '@reduxjs/toolkit';
import cardSlice from './projects/projectCardSlice';

const store = configureStore({
    reducer: {
        cards: cardSlice
    },
    devTools: true
});

export default store;