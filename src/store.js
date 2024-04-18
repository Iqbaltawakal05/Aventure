import { configureStore } from "@reduxjs/toolkit";
import notifReducer from "@/slice/notif";

export const store = configureStore ({
    reducer: {
        notif: notifReducer,
    }  
})