import {createSlice} from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        userLogin: {},
        isAuthenticated: false,
    },
    reducers: {
        setUserLogin: (state, action) => {
            // cap nhat lai state
            state.userLogin = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.userLogin = {};
            state.isAuthenticated = false;
        }
    }
})

export const {setUserLogin, logout} = authSlice.actions;

export default authSlice.reducer;