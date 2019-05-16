import {
  UPDATE_COLOR_THEME,
  MOVE_TO_PROFILE,
  MOVE_TO_SORTING_HAT,
  MOVE_TO_MATCHES,
  MOVE_TO_LOGGED_IN_LANDING,
  MOVE_TO_CONVERSATIONS,
  MOVE_TO_TOUR,
  MOVE_TO_LOGGED_OUT_LANDING,
  MOVE_TO_FOOTER
} from "../actions/types";

let cloneObject = obj => {
  return JSON.parse(JSON.stringify(obj));
};

let initialState = {
  backgroundColor: null,
  key: null,
  keyCompliment1: null,
  keyCompliment1Text8Color: null,
  keyCompliment2: null,
  thirdColor: null,
  textDot5Color: null,
  text1Color: null,
  text2Color: null,
  text3Color: null,
  text4Color: null,
  text5Color: null,
  text6Color: null,
  text7Color: null,
  text8Color: null,
  keyText1Color: null,
  keyText2Color: null,
  keyText3Color: null,
  keyText4Color: null,
  keyText5Color: null,
  keyText6Color: null,
  keyText7Color: null,
  keyText8Color: null,
  activeSection: null,
  profileButtonColor: null,
  profileButtonTextColor: null,
  sortingHatButtonColor: null,
  sortingHatButtonTextColor: null,
  matchesButtonColor: null,
  matchesButtonTextColor: null,
  conversationsButtonColor: null,
  conversationsButtonTextColor: null,
  tourButtonColor: null,
  tourButtonTextColor: null
};

function _getStateForSection(newState) {
  if (newState.activeSection === "sorting_hat") {
    newState.profileButtonColor = newState.text8Color;
    newState.profileButtonTextColor = newState.text6Color;
    newState.sortingHatButtonColor = newState.key;
    newState.sortingHatButtonTextColor = newState.key;
    newState.matchesButtonColor = newState.text8Color;
    newState.matchesButtonTextColor = newState.text6Color;
    newState.conversationsButtonColor = newState.text8Color;
    newState.conversationsButtonTextColor = newState.text6Color;
    newState.tourButtonColor = newState.text8Color;
    newState.tourButtonTextColor = newState.text6Color;
  } else if (newState.activeSection === "matches") {
    newState.profileButtonColor = newState.text8Color;
    newState.profileButtonTextColor = newState.text6Color;
    newState.sortingHatButtonColor = newState.text8Color;
    newState.sortingHatButtonTextColor = newState.text6Color;
    newState.matchesButtonColor = newState.key;
    newState.matchesButtonTextColor = newState.key;
    newState.conversationsButtonColor = newState.text8Color;
    newState.conversationsButtonTextColor = newState.text6Color;
    newState.tourButtonColor = newState.text8Color;
    newState.tourButtonTextColor = newState.text6Color;
  } else if (newState.activeSection === "profile") {
    newState.profileButtonColor = newState.key;
    newState.profileButtonTextColor = newState.key;
    newState.sortingHatButtonColor = newState.text8Color;
    newState.sortingHatButtonTextColor = newState.text6Color;
    newState.matchesButtonColor = newState.text8Color;
    newState.matchesButtonTextColor = newState.text6Color;
    newState.conversationsButtonColor = newState.text8Color;
    newState.conversationsButtonTextColor = newState.text6Color;
    newState.tourButtonColor = newState.text8Color;
    newState.tourButtonTextColor = newState.text6Color;
  } else if (newState.activeSection === "logged_in_landing") {
    newState.profileButtonColor = newState.text8Color;
    newState.profileButtonTextColor = newState.text6Color;
    newState.sortingHatButtonColor = newState.text8Color;
    newState.sortingHatButtonTextColor = newState.text6Color;
    newState.matchesButtonColor = newState.text8Color;
    newState.matchesButtonTextColor = newState.text6Color;
    newState.conversationsButtonColor = newState.text8Color;
    newState.conversationsButtonTextColor = newState.text6Color;
    newState.tourButtonColor = newState.text8Color;
    newState.tourButtonTextColor = newState.text6Color;
  } else if (newState.activeSection === "conversations") {
    newState.profileButtonColor = newState.text8Color;
    newState.profileButtonTextColor = newState.text6Color;
    newState.sortingHatButtonColor = newState.text8Color;
    newState.sortingHatButtonTextColor = newState.text6Color;
    newState.matchesButtonColor = newState.text8Color;
    newState.matchesButtonTextColor = newState.text6Color;
    newState.conversationsButtonColor = newState.key;
    newState.conversationsButtonTextColor = newState.key;
    newState.tourButtonColor = newState.text8Color;
    newState.tourButtonTextColor = newState.text6Color;
  } else if (newState.activeSection === "tour") {
    newState.profileButtonColor = newState.text8Color;
    newState.profileButtonTextColor = newState.text6Color;
    newState.sortingHatButtonColor = newState.text8Color;
    newState.sortingHatButtonTextColor = newState.text6Color;
    newState.matchesButtonColor = newState.text8Color;
    newState.matchesButtonTextColor = newState.text6Color;
    newState.conversationsButtonColor = newState.text8Color;
    newState.conversationsButtonTextColor = newState.text6Color;
    newState.tourButtonColor = newState.key;
    newState.tourButtonTextColor = newState.key;
  } else if (newState.activeSection === "footer") {
    newState.profileButtonColor = newState.text8Color;
    newState.profileButtonTextColor = newState.text6Color;
    newState.sortingHatButtonColor = newState.text8Color;
    newState.sortingHatButtonTextColor = newState.text6Color;
    newState.matchesButtonColor = newState.text8Color;
    newState.matchesButtonTextColor = newState.text6Color;
    newState.conversationsButtonColor = newState.text8Color;
    newState.conversationsButtonTextColor = newState.text6Color;
    newState.tourButtonColor = newState.text8Color;
    newState.tourButtonTextColor = newState.text6Color;
  }
  return newState;
}

function _updateColorTheme(newState, action) {
  newState.backgroundColor = action.backgroundColor;
  newState.key = action.key;
  newState.keyCompliment1 = action.keyCompliment1;
  newState.keyCompliment1Text8Color = action.keyCompliment1Text8Color;
  newState.keyCompliment2 = action.keyCompliment2;
  newState.thirdColor = action.thirdColor;
  newState.textDot5Color = action.textDot5Color;
  newState.text1Color = action.text1Color;
  newState.text2Color = action.text2Color;
  newState.text3Color = action.text3Color;
  newState.text4Color = action.text4Color;
  newState.text5Color = action.text5Color;
  newState.text6Color = action.text6Color;
  newState.text7Color = action.text7Color;
  newState.text8Color = action.text8Color;
  newState.keyText1Color = action.keyText1Color;
  newState.keyText2Color = action.keyText2Color;
  newState.keyText3Color = action.keyText3Color;
  newState.keyText4Color = action.keyText4Color;
  newState.keyText5Color = action.keyText5Color;
  newState.keyText6Color = action.keyText6Color;
  newState.keyText7Color = action.keyText7Color;
  newState.keyText8Color = action.keyText8Color;
  newState = _getStateForSection(newState);
  return newState;
}

export default function(state = initialState, action) {
  let newState = cloneObject(state);
  switch (action.type) {
    case UPDATE_COLOR_THEME:
      newState = _updateColorTheme(newState, action);
      return newState;
    case MOVE_TO_TOUR:
      newState.activeSection = "tour";
      newState = _getStateForSection(newState, action);
      return newState;
    case MOVE_TO_PROFILE:
      newState.activeSection = "profile";
      newState = _getStateForSection(newState);
      return newState;
    case MOVE_TO_SORTING_HAT:
      newState.activeSection = "sorting_hat";
      newState = _getStateForSection(newState);
      return newState;
    case MOVE_TO_MATCHES:
      newState.activeSection = "matches";
      newState = _getStateForSection(newState);
      return newState;
    case MOVE_TO_LOGGED_IN_LANDING:
      newState.activeSection = "logged_in_landing";
      newState = _getStateForSection(newState);
      return newState;
    case MOVE_TO_LOGGED_OUT_LANDING:
      console.log("MOVE_TO_LOGGED_OUT_LANDING reducer");
      newState.activeSection = "logged_out_landing";
      return newState;
    case MOVE_TO_CONVERSATIONS:
      newState.activeSection = "conversations";
      newState = _getStateForSection(newState);
      return newState;
    case MOVE_TO_FOOTER:
      newState.activeSection = "footer";
      newState = _getStateForSection(newState);
      return newState;
    default:
      return state || newState;
  }
}
