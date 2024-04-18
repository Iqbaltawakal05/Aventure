import { configureStore } from '@reduxjs/toolkit';
import notifReducer from '@/slice/notifSlice';

export const store = configureStore({
  reducer: {
    notif: notifReducer,
  },
});