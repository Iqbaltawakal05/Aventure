import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
};

const notifSlice = createSlice({
  name: 'notif',
  initialState,
  reducers: {
    setNotif(state, action) {
      state.message = action.payload.message;
    },
    clearNotif(state) {
      state.message = '';
    },
  },
});

export const { setNotif, clearNotif } = notifSlice.actions;
export default notifSlice.reducer;