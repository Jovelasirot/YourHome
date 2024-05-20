import {
  TURN_OFF_SPINNER,
  TURN_ON_SPINNER,
  LOGIN_USER,
} from "../actions/actions";

const initialState = {
  content: {},
  loading: false,
};

const logInReducers = (state = initialState, action) => {
  switch (action.type) {
    case TURN_ON_SPINNER:
      return {
        ...state,
        loading: true,
      };
    case TURN_OFF_SPINNER:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_USER:
      return {
        ...state,
        content: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default logInReducers;
