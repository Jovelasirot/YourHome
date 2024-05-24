import {
  TURN_OFF_SPINNER,
  TURN_ON_SPINNER,
  RESERVATIONS_LIST,
} from "../actions/actions";

const initialState = {
  content: [],
  loading: false,
};

const reservetionReducers = (state = initialState, action) => {
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
    case RESERVATIONS_LIST:
      return {
        ...state,
        content: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default reservetionReducers;
