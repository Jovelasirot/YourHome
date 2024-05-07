import { combineReducers, configureStore } from "@reduxjs/toolkit";
import signUpReducers from "../reducers/signUpReducers";
import logInReducers from "../reducers/logInReducers";

const globalReducer = combineReducers({
  register: signUpReducers,
  login: logInReducers,
});

const store = configureStore({
  reducer: globalReducer,
});

export default store;
