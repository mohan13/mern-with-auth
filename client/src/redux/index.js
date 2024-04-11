import apiReducer from "./apiReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  userInfo: apiReducer,
});

export default rootReducer;
