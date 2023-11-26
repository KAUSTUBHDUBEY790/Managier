import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userReducer";
import loadersReducer from "./loadersReducer";

const store = configureStore({
  reducer: {
    users: usersReducer,
    loaders: loadersReducer,
  },
});

export default store;