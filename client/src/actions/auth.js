import axios from "axios";
import {
  SAVE_FETCHED_USER_AUTH,
  SAVE_FETCHED_USER_PROFILE,
  UPDATE_TOTAL_USER_VOTES_ACROSS_ALL_SESSIONS,
  UPDATE_MATCHES_SEEN
} from "./types";
import { updateWithSavedColorTheme } from "./colorTheme";
import { store } from "../index";

function saveUserProfile(response, dispatch) {
  dispatch({
    type: SAVE_FETCHED_USER_PROFILE,
    profile: response.data.profile
  });

  // separate dispatch that goes to matches reducer
  dispatch({
    type: UPDATE_TOTAL_USER_VOTES_ACROSS_ALL_SESSIONS,
    additionalVotes: response.data.profile.asks.totalUserVotes
  });

  // separate dispatch that goes to customHeader reducer
  let numberOfUnseenMatches = 0;
  for (let i = 0; i < response.data.matches.length; i++) {
    if (response.data.matches[i]["seen"] === false) {
      numberOfUnseenMatches += 1;
    }
  }
  dispatch({
    type: UPDATE_MATCHES_SEEN,
    numberOfUnseenMatches: numberOfUnseenMatches,
    matches: response.data.matches
  });
}

export const initializeApp = () => async dispatch => {
  const response = await axios.get("/api/current_user");

  dispatch({
    type: SAVE_FETCHED_USER_AUTH,
    auth: response.data.auth,
    mongoDBUserId: response.data._id
  });

  if (store.getState().auth.loggedInState === "logged_in") {
    saveUserProfile(response, dispatch);
    updateWithSavedColorTheme(dispatch, response.data.profile.colorTheme);
  }
};
