import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import darkReducer from "./features/dark/darkSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        darkMode: darkReducer
    }
})

