import { configureStore } from '@reduxjs/toolkit';
import { notificationReducer } from '@/slice/notifSlice';

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
});