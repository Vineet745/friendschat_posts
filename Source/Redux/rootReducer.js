import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/AuthReducer";

export default combineReducers({
    auth : authReducer,
})