import { combineReducers, configureStore } from "@reduxjs/toolkit";
import signUpReducers from "../reducers/signUpReducers";
import logInReducers from "../reducers/logInReducers";
import getPropertiesReducers from "../reducers/getPropertiesReducers";

const globalReducer = combineReducers({
  register: signUpReducers,
  login: logInReducers,
  properties: getPropertiesReducers,
});

const store = configureStore({
  reducer: globalReducer,
});

export default store;
