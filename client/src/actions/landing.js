import axios from "axios";
import {
  SAVE_FETCHED_LANDING_ASKS,
  ON_VOTE_LANDING,
  CLOSE_FIRST_VOTE_MODAL,
  MOVE_TO_LOGGED_OUT_LANDING,
  MOVE_TO_LOGGED_IN_LANDING
} from "./types";
import { store } from "../index";

export const fetchLandingPageSortingHatAsks = () => async dispatch => {
  const response = await axios.get("/api/sorting_hat/landing_asks");
  dispatch({
    type: SAVE_FETCHED_LANDING_ASKS,
    landingAsks: response.data
  });

  // determines if logged_in_landing or logged_out_landing page
  // just to dispatch action saying which page user is on
  const onLoggedInLanding = store.getState().auth === "logged_in";
  if (onLoggedInLanding === true) {
    dispatch({ type: MOVE_TO_LOGGED_IN_LANDING });
  } else {
    dispatch({ type: MOVE_TO_LOGGED_OUT_LANDING });
  }
};

export const onVoteLanding = (
  answerIndex,
  askIndex,
  isFirstVote
) => dispatch => {
  dispatch({
    type: ON_VOTE_LANDING,
    answerIndex: answerIndex,
    askIndex: askIndex,
    isFirstVote: isFirstVote
  });
};

export const closeFirstVoteModal = () => dispatch => {
  dispatch({
    type: CLOSE_FIRST_VOTE_MODAL
  });
};
