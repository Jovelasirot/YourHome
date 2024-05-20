import {
  TURN_OFF_SPINNER,
  TURN_ON_SPINNER,
  SELL_PROPERTY,
} from "../actions/actions";

const initialState = {
  content: {},
  loading: false,
};

const sellPropertyReducers = (state = initialState, action) => {
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
    case SELL_PROPERTY:
      return {
        ...state,
        content: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default sellPropertyReducers;
