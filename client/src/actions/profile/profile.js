import axios from "axios";
import {
  ON_CHANGE_NAME,
  ON_CHANGE_AGE,
  ON_CHANGE_INTERESTS,
  ON_CHANGE_TIME_ZONE,
  ON_CHANGE_TIME_SLOT,
  SAVE_PROFILE_START,
  SAVE_PROFILE_DONE,
  SAVE_PROFILE_ERROR,
  DECREMENT_NEURONS,
  DECREMENT_NEURONS_ERROR,
  ON_CHANGE_EMAIL,
  ON_CHANGE_LINKEDIN_PROFILE_URL,
  ON_CHANGE_GITHUB_PROFILE_URL
} from "../types";
import {
  isValidName,
  isValidAge,
  isValidInterests,
  isValidEmail,
  isValidTimeZone,
  isValidUrl
} from "../../utils/validateProfileEdit";
import { runAthena } from "../sorting_hat/sortingHat";

export const onChangeName = name => dispatch => {
  dispatch({ type: ON_CHANGE_NAME, name: name, hasError: !isValidName(name) });
};

export const onChangeEmail = email => dispatch => {
  dispatch({
    type: ON_CHANGE_EMAIL,
    email: email,
    hasError: !isValidEmail(email)
  });
};

export const onChangeLinkedInPublicProfileUrl = linkedInPublicProfileUrl => dispatch => {
  dispatch({
    type: ON_CHANGE_LINKEDIN_PROFILE_URL,
    linkedInPublicProfileUrl: linkedInPublicProfileUrl,
    hasError: !isValidUrl(linkedInPublicProfileUrl)
  });
};

export const onChangeGithubPublicProfileUrl = githubPublicProfileUrl => dispatch => {
  dispatch({
    type: ON_CHANGE_GITHUB_PROFILE_URL,
    githubPublicProfileUrl: githubPublicProfileUrl,
    hasError: !isValidUrl(githubPublicProfileUrl)
  });
};

export const onChangeAge = age => dispatch => {
  dispatch({ type: ON_CHANGE_AGE, age: age, hasError: !isValidAge(age) });
};

export const onChangeInterests = interests => dispatch => {
  dispatch({
    type: ON_CHANGE_INTERESTS,
    interests: interests,
    hasError: !isValidInterests(interests)
  });
};

export const onChangeTimeZone = timeZone => dispatch => {
  dispatch({
    type: ON_CHANGE_TIME_ZONE,
    timeZone: timeZone,
    hasError: !isValidTimeZone(timeZone)
  });
};

export const onChangeTimeSlot = editedTimeSlot => dispatch => {
  dispatch({
    type: ON_CHANGE_TIME_SLOT,
    editedTimeSlot: editedTimeSlot,
    hasError: false
  });
};

export const saveProfile = (profile, history) => async dispatch => {
  dispatch({ type: SAVE_PROFILE_START });
  const response = await axios.post("/api/profile", profile);
  if (response.status === 200) {
    dispatch({ type: SAVE_PROFILE_DONE });
    if (
      !profile.ranInitialMinerva &&
      profile.interests.length > 0 &&
      profile.asks.totalUserVotes > 4
    ) {
      // user just filled out their interests and has already voted on 4 Sorting Hat questions, so run Athena
      runAthena(dispatch);
    }
    history.push("/profile");
  } else {
    dispatch({ type: SAVE_PROFILE_ERROR });
  }
};

export const decrementNeurons = (
  decrementAmount,
  mongoDBUserId
) => async dispatch => {
  const paymentInfo = {
    decrementAmount: decrementAmount,
    mongoDBUserId: mongoDBUserId
  };
  const response = await axios.put(
    "/api/profile/decrease_neurons",
    paymentInfo
  );
  if (response.status === 200) {
    dispatch({
      type: DECREMENT_NEURONS,
      decrementAmount: decrementAmount
    });
  } else {
    dispatch({ type: DECREMENT_NEURONS_ERROR });
  }
};
