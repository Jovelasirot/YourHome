import {
  TURN_OFF_SPINNER,
  TURN_ON_SPINNER,
  FAVORITES_LIST,
} from "../actions/actions";

const initialState = {
  content: [],
  loading: false,
};

const favoritePropertyReducers = (state = initialState, action) => {
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
    case FAVORITES_LIST:
      return {
        ...state,
        content: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default favoritePropertyReducers;
