import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    isVisible: false,
    message: '',
  },
  reducers: {
    showNotification: (state, action) => {
      state.isVisible = true;
      state.message = action.payload;
    },
    hideNotification: (state) => {
      state.isVisible = false;
      state.message = '';
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;
