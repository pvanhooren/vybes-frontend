import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import accountManagerReducer from "./accountManager";

export default configureStore({
    reducer: { 
        counter: counterReducer,
        accountManager: accountManagerReducer,
    }
})