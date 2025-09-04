import { configureStore } from "@reduxjs/toolkit";
import jwtReducer from "./Slices/JwtSlices";
import userReducer from "./Slices/UserSlice";
export default configureStore({
  reducer: {
    jwt: jwtReducer,
    user:userReducer
  },
});
