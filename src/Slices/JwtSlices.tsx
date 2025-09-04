import { createSlice } from "@reduxjs/toolkit";

const jwtSlice = createSlice({
    name: "jwt",
    initialState: localStorage.getItem("token") || '',
    reducers: {
        setJwt: (state, action) => {
            localStorage.setItem("token", action.payload);
            return action.payload; // Just return the new value
        },
        removeJwt: (state) => {
            localStorage.removeItem("token");
            return ''; // Just return the new value
        }
    }
});

export default jwtSlice.reducer;
export const { setJwt, removeJwt } = jwtSlice.actions;