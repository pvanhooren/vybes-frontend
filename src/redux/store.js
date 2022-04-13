import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import tokenManagerReducer from "./tokenManager";

export default configureStore({
    reducer: { 
        counter: counterReducer,
        tokenManager: tokenManagerReducer,
    }
})