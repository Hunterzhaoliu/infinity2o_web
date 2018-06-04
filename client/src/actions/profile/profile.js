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
  isValidEmail
} from "../../utils/validateProfileEdit";
import validUrl from "valid-url";

export const onChangeName = newName => dispatch => {
  if (isValidName(newName)) {
    dispatch({ type: ON_CHANGE_NAME, newName: newName, hasError: false });
  } else {
    dispatch({ type: ON_CHANGE_NAME, newName: newName, hasError: true });
  }
};

export const onChangeEmail = newEmail => dispatch => {
  if (isValidEmail(newEmail)) {
    dispatch({
      type: ON_CHANGE_EMAIL,
      newEmail: newEmail,
      hasError: false
    });
  } else {
    dispatch({ type: ON_CHANGE_EMAIL, newEmail: newEmail, hasError: true });
  }
};

export const onChangeLinkedInPublicProfileUrl = newLinkedInPublicProfileUrl => dispatch => {
  if (validUrl.isUri(newLinkedInPublicProfileUrl)) {
    dispatch({
      type: ON_CHANGE_LINKEDIN_PROFILE_URL,
      newLinkedInPublicProfileUrl: newLinkedInPublicProfileUrl,
      hasError: false
    });
  } else {
    dispatch({
      type: ON_CHANGE_LINKEDIN_PROFILE_URL,
      newLinkedInPublicProfileUrl: newLinkedInPublicProfileUrl,
      hasError: true
    });
  }
};
export const onChangeGithubPublicProfileUrl = newGithubPublicProfileUrl => dispatch => {
  if (validUrl.isUri(newGithubPublicProfileUrl)) {
    dispatch({
      type: ON_CHANGE_GITHUB_PROFILE_URL,
      newGithubPublicProfileUrl: newGithubPublicProfileUrl,
      hasError: false
    });
  } else {
    dispatch({
      type: ON_CHANGE_GITHUB_PROFILE_URL,
      newGithubPublicProfileUrl: newGithubPublicProfileUrl,
      hasError: true
    });
  }
};

export const onChangeAge = newAge => dispatch => {
  if (isValidAge(newAge)) {
    dispatch({ type: ON_CHANGE_AGE, newAge: newAge, hasError: false });
  } else {
    dispatch({ type: ON_CHANGE_AGE, newAge: newAge, hasError: true });
  }
};

export const onChangeInterests = newInterests => dispatch => {
  if (isValidInterests(newInterests)) {
    dispatch({
      type: ON_CHANGE_INTERESTS,
      newInterests: newInterests,
      hasError: false
    });
  } else {
    dispatch({
      type: ON_CHANGE_INTERESTS,
      newInterests: newInterests,
      hasError: true
    });
  }
};

export const onChangeTimeZone = newTimeZone => dispatch => {
  if (
    newTimeZone[0] === "europe" ||
    newTimeZone[0] === "canada" ||
    newTimeZone[0] === "united_states"
  ) {
    dispatch({
      type: ON_CHANGE_TIME_ZONE,
      newTimeZone: newTimeZone,
      hasError: false
    });
  } else {
    dispatch({
      type: ON_CHANGE_TIME_ZONE,
      newTimeZone: newTimeZone,
      hasError: true
    });
  }
};

export const onChangeTimeSlot = newTimeSlot => dispatch => {
  dispatch({
    type: ON_CHANGE_TIME_SLOT,
    newTimeSlot: newTimeSlot,
    hasError: false
  });
};

export const saveProfile = (values, history) => async dispatch => {
  dispatch({ type: SAVE_PROFILE_START });
  // if the user already has profile data saved and makes a edit to one
  // field we need to make sure we send the old unedited data for profile
  if (values.newName === null) {
    values.newName = values.name;
  }
  if (values.newAge === null) {
    values.newAge = values.age;
  }
  if (values.newInterests.length === 0) {
    values.newInterests = values.interests;
  }
  if (values.newTimeZone === null) {
    values.newTimeZone = values.timeZone;
  }
  if (Object.keys(values.newAvailability).length === 0) {
    values.newAvailability = values.availability;
  }
  if (values.newEmail === null) {
    values.newEmail = values.email;
  }
  if (values.newLinkedInPublicProfileUrl === null) {
    values.newLinkedInPublicProfileUrl = values.linkedInPublicProfileUrl;
  }
  if (values.newGithubPublicProfileUrl === null) {
    values.newGithubPublicProfileUrl = values.githubPublicProfileUrl;
  }
  const response = await axios.post("/api/profile", values);
  if (response.status === 200) {
    dispatch({ type: SAVE_PROFILE_DONE });
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
