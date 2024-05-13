import {
  TURN_OFF_SPINNER,
  TURN_ON_SPINNER,
  ADD_TO_FAVORITE,
} from "../actions/actions";

const initialState = {
  content: {},
  loading: false,
};

const postToFavorite = (state = initialState, action) => {
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
    case ADD_TO_FAVORITE:
      return {
        ...state,
        content: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default postToFavorite;
