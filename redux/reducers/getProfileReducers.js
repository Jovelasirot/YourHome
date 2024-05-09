import {
  TURN_OFF_SPINNER,
  TURN_ON_SPINNER,
  GET_PROFILE,
} from "../actions/actions";

const initialState = {
  content: {},
  loading: false,
};

const getProfileReducers = (state = initialState, action) => {
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
    case GET_PROFILE:
      return {
        ...state,
        content: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default getProfileReducers;
