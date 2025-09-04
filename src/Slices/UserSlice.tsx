import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const userSlice=createSlice({
    name:"user",
    initialState:localStorage.getItem("token")?jwtDecode(localStorage.getItem("token") as string):{},
    reducers:{
           setUser:(state,action)=>{
            state=action.payload;
            return state;
        },
        removeUser:(state)=>{
            state={};
            return state;
        }
        }
    
})

export default userSlice.reducer;
export const {removeUser,setUser}=userSlice.actions;