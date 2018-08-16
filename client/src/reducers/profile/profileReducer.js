import {
  SAVE_FETCHED_USER_PROFILE,
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
  PAYMENT_SUCCESS,
  UPDATE_NEURONS,
  PAYMENT_ERROR,
  SAVE_COLOR_THEME_START,
  SAVE_COLOR_THEME_DONE,
  SAVE_COLOR_THEME_ERROR,
  ON_CHANGE_EMAIL,
  ON_CHANGE_LINKEDIN_PROFILE_URL,
  ON_CHANGE_GITHUB_PROFILE_URL,
  ADD_NEURONS,
  ADD_NEURONS_ERROR,
  RUNNING_ATHENA_FOR_USER_DONE,
  USER_UNSUBSCRIBED
} from "../../actions/types";

let cloneObject = obj => {
  return JSON.parse(JSON.stringify(obj));
};

let initialState = {
  name: null,
  email: null,
  age: null,
  interests: [],
  linkedInPublicProfileUrl: null,
  githubPublicProfileUrl: null,
  timeZone: [],
  availability: {},
  imageUrl: null,
  hasAgeError: false,
  hasNameError: false,
  hasEmailError: false,
  hasInterestsError: false,
  hasLinkedInPublicProfileUrlError: false,
  hasGithubPublicProfileUrlError: false,
  hasTimeZoneError: false,
  hasAvailabilityError: false,
  save: null,
  asks: null,
  payment: {
    hasDecrementNeuronsError: false,
    hasPaymentError: false,
    hasAddNeuronError: false,
    infinityStatus: false
  },
  colorThemeSave: null,
  ranInitialMinerva: false
};

export default function(state = initialState, action) {
  let newState = cloneObject(state);
  switch (action.type) {
    case SAVE_FETCHED_USER_PROFILE:
      if (action.profile !== undefined) {
        newState.imageUrl = action.profile.imageUrl;
        newState.name = action.profile.name;
        newState.email = action.profile.emailInformation.email;
        newState.age = action.profile.age;
        newState.interests = action.profile.interests;
        newState.linkedInPublicProfileUrl =
          action.profile.linkedInPublicProfileUrl;
        newState.githubPublicProfileUrl = action.profile.githubPublicProfileUrl;
        newState.timeZone = action.profile.timeZone;
        newState.availability = action.profile.availability;
        newState.asks = action.profile.asks;
        newState.payment = action.profile.payment;
        newState.ranInitialMinerva = action.profile.minerva.ranInitialMinerva;
      }
      return newState;
    case SAVE_COLOR_THEME_START:
      newState.colorThemeSave = "save_start";
      return newState;
    case SAVE_COLOR_THEME_DONE:
      newState.colorThemeSave = "save_done";
      return newState;
    case SAVE_COLOR_THEME_ERROR:
      newState.colorThemeSave = "save_error";
      return newState;
    case ADD_NEURONS:
      newState.payment.neuronsInBillions += action.neuronsInBillions;
      newState.payment.hasAddNeuronError = false;
      return newState;
    case ADD_NEURONS_ERROR:
      newState.payment.hasAddNeuronError = true;
      return newState;
    case ON_CHANGE_NAME:
      newState.name = action.name;
      newState.hasNameError = action.hasError;
      return newState;
    case ON_CHANGE_EMAIL:
      newState.email = action.email;
      newState.hasEmailError = action.hasError;
      return newState;
    case ON_CHANGE_AGE:
      newState.age = action.age;
      newState.hasAgeError = action.hasError;
      return newState;
    case ON_CHANGE_INTERESTS:
      newState.interests = action.interests;
      newState.hasInterestsError = action.hasError;
      return newState;
    case ON_CHANGE_LINKEDIN_PROFILE_URL:
      newState.linkedInPublicProfileUrl = action.linkedInPublicProfileUrl;
      newState.hasLinkedInPublicProfileUrlError = action.hasError;
      return newState;
    case ON_CHANGE_GITHUB_PROFILE_URL:
      newState.githubPublicProfileUrl = action.githubPublicProfileUrl;
      newState.hasGithubPublicProfileUrlError = action.hasError;
      return newState;
    case ON_CHANGE_TIME_ZONE:
      newState.timeZone = action.timeZone;
      newState.hasTimeZoneError = action.hasError;
      return newState;
    case ON_CHANGE_TIME_SLOT:
      const dayValue = action.editedTimeSlot[0];
      const hours = action.editedTimeSlot[1];
      if (newState.availability[dayValue] !== undefined) {
        const i = newState.availability[dayValue].indexOf(hours);
        if (i !== -1) {
          // time slot is already checked so uncheck by removing
          newState.availability[dayValue].splice(i, 1);
        } else {
          newState.availability[dayValue].push(hours);
        }
      } else {
        newState.availability[dayValue] = [];
        newState.availability[dayValue].push(hours);
      }
      return newState;
    case SAVE_PROFILE_START:
      newState.save = "save_start";
      return newState;
    case SAVE_PROFILE_DONE:
      newState.save = "save_done";
      return newState;
    case SAVE_PROFILE_ERROR:
      newState.save = "save_error";
      return newState;
    case DECREMENT_NEURONS:
      if (!newState.payment.infinityStatus) {
        newState.payment.neuronsInBillions -= action.decrementAmount;
        newState.payment.hasDecrementNeuronsError = false;
      } // do nothing if in infinityStatus is true
      return newState;
    case DECREMENT_NEURONS_ERROR:
      newState.payment.hasDecrementNeuronsError = true;
      return newState;
    case PAYMENT_SUCCESS:
      newState.payment.hasPaymentError = false;
      return newState;
    case UPDATE_NEURONS:
      if (!newState.payment.infinityStatus) {
        newState.payment.neuronsInBillions += action.neuronsInBillionsToAdd;
        newState.payment.infinityStatus = action.infinityStatus;
      } // do nothing if in infinityStatus is true
      return newState;
    case PAYMENT_ERROR:
      newState.payment.hasPaymentError = true;
      return newState;
    case RUNNING_ATHENA_FOR_USER_DONE:
      newState.ranInitialMinerva = true;
      return newState;
    case USER_UNSUBSCRIBED:
      newState.name = action.name;
      return newState;
    default:
      return state;
  }
}
