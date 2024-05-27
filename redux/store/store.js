import { combineReducers, configureStore } from "@reduxjs/toolkit";
import signUpReducers from "../reducers/signUpReducers";
import logInReducers from "../reducers/logInReducers";
import getPropertiesReducers from "../reducers/getPropertiesReducers";
import getProfileReducers from "../reducers/getProfileReducers";
import favoritePropertyReducers from "../reducers/favoritePropertyReducers";
import getAllProperties from "../reducers/allPropertyReducers";
import singlePropertyReducers from "../reducers/singlePropertyReducers";
import reservetionReducers from "../reducers/reservetionReducers";
import propertyReservationsReducers from "../reducers/propertyReservationsReducers";

const globalReducer = combineReducers({
  register: signUpReducers,
  login: logInReducers,
  properties: getPropertiesReducers,
  profile: getProfileReducers,
  favoriteList: favoritePropertyReducers,
  allProperties: getAllProperties,
  singleProperty: singlePropertyReducers,
  reservationList: reservetionReducers,
  reservationListProperty: propertyReservationsReducers,
});

const store = configureStore({
  reducer: globalReducer,
});

export default store;
