import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import apiReducer from "./apiReducer";
const store = configureStore({
  reducer: apiReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
