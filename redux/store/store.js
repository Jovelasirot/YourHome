import { combineReducers, configureStore } from "@reduxjs/toolkit";
import signUpReducers from "../reducers/signUpReducers";
import logInReducers from "../reducers/logInReducers";
import getPropertiesReducers from "../reducers/getPropertiesReducers";
import getProfileReducers from "../reducers/getProfileReducers";
import favoritePropertyReducers from "../reducers/favoritePropertyReducers";
import getAllProperties from "../reducers/allPropertyReducers";

const globalReducer = combineReducers({
  register: signUpReducers,
  login: logInReducers,
  properties: getPropertiesReducers,
  profile: getProfileReducers,
  favoriteList: favoritePropertyReducers,
  allProperties: getAllProperties,
});

const store = configureStore({
  reducer: globalReducer,
});

export default store;
