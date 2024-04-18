import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notif: []
};

export const notifSlice = createSlice({
    name: "notif",
    initialState,
    reducers: {
        setNotif: (state, action) => {
            state.notif.push(action.payload);
        },
        clearNotif: (state) => {
            state.notif = [];
        }
    }
});

export const { setNotif, clearNotif } = notifSlice.actions;

export default notifSlice.reducer;