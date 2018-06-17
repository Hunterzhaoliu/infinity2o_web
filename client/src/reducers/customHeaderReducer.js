import {
  UPDATE_WINDOW_WIDTH,
  TOGGLE_SIDER,
  UPDATE_MATCHES_SEEN,
  DECREMENT_NUMBER_OF_UNSEEN_MATCHES
} from "../actions/types";

let cloneObject = obj => {
  return JSON.parse(JSON.stringify(obj));
};

let initialState = {
  windowWidth: null,
  siderDisplay: false,
  numberOfUnseenMatches: 0,
  matches: null
};

export default function(state = initialState, action) {
  let newState = cloneObject(state);
  switch (action.type) {
    case UPDATE_WINDOW_WIDTH:
      newState.windowWidth = action.newWindowWidth;
      return newState;
    case TOGGLE_SIDER:
      newState.siderDisplay = !state.siderDisplay;
      return newState;
    case UPDATE_MATCHES_SEEN:
      newState.numberOfUnseenMatches = action.numberOfUnseenMatches;
      newState.matches = action.matches;
      return newState;
    case DECREMENT_NUMBER_OF_UNSEEN_MATCHES:
      newState.numberOfUnseenMatches -= 1;
      return newState;
    default:
      return state;
  }
}
