import { SAVE_FETCHED_USER_AUTH } from "../actions/types";

let cloneObject = obj => {
  return JSON.parse(JSON.stringify(obj));
};

let initialState = {
  loggedInState: "not_logged_in",
  googleId: null,
  linkedInId: null,
  mongoDBUserId: null
};

export default function(state = initialState, action) {
  let newState = cloneObject(state);
  switch (action.type) {
    case SAVE_FETCHED_USER_AUTH:
      if (action.auth !== undefined) {
        newState.loggedInState = "logged_in";
        newState.mongoDBUserId = action.mongoDBUserId;
        if (action.auth.googleId !== undefined) {
          newState.googleId = action.auth.googleId;
        } else {
          newState.linkedInId = action.auth.linkedInId;
        }
      } else {
        // user is logged out
        newState = initialState;
      }
      return newState;
    default:
      return state;
  }
}
