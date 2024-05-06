import { combineReducers, configureStore } from "@reduxjs/toolkit";
import signUpReducers from "../reducers/signUpReducers";

const globalReducer = combineReducers({
  register: signUpReducers,
});

const store = configureStore({
  reducer: globalReducer,
});

export default store;
