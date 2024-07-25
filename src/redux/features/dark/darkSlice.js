import {createSlice} from "@reduxjs/toolkit";

export const darkSlice = createSlice({
    name: "darkMode",
    initialState: {
        isDarkMode: false,  // khoi tao state
    },
    reducers: {
        toggleDarkMode: (state, action) => {
            state.isDarkMode = !state.isDarkMode;
        }
    }
})

export const {toggleDarkMode} = darkSlice.actions;
export default darkSlice.reducer