import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../requestState';
import { fetchUserAsync, updateUserAsync } from './userThunks';

const INITIAL_STATE = {
  currentUser: null,
  status: REQUEST_STATE.IDLE,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action) => {
      console.log('setUser called with:', action.payload);
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAsync.pending, (state) => {
        console.log('fetchUserAsync.pending');
        state.status = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        console.log('fetchUserAsync.fulfilled with:', action.payload);
        state.status = REQUEST_STATE.FULFILLED;
        state.currentUser = action.payload;
      })
      .addCase(fetchUserAsync.rejected, (state, action) => {
        console.log('fetchUserAsync.rejected with:', action.error);
        state.status = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        console.log('updateUserAsync.fulfilled with:', action.payload);
        state.currentUser = action.payload;
      });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
