import axios from "axios";
import {
  MOVE_TO_TOUR,
  UPDATE_COLOR_THEME,
  MOVE_TO_PROFILE,
  MOVE_TO_SORTING_HAT,
  MOVE_TO_MATCHES,
  MOVE_TO_CONVERSATIONS,
  SAVE_COLOR_THEME_START,
  SAVE_COLOR_THEME_DONE,
  SAVE_COLOR_THEME_ERROR,
  MOVE_TO_FOOTER
} from "./types";
import {
  colors1,
  colors2,
  colors3,
  colors4,
  colors5,
  colors6,
  colors7,
  colors8,
  colors9,
  GREY_DOT_5,
  GREY_1,
  GREY_2,
  GREY_3,
  GREY_4,
  GREY_5,
  GREY_6,
  GREY_7,
  GREY_8,
  GREY_9,
  GREY_9_DOT_5
} from "../containers/styles/ColorConstants";

export const onTour = () => {
  return function(dispatch) {
    dispatch({ type: MOVE_TO_TOUR });
  };
};

// onLanding is done in landing action

export const onProfile = () => {
  return function(dispatch) {
    dispatch({ type: MOVE_TO_PROFILE });
  };
};

export const onSortingHat = () => {
  return function(dispatch) {
    dispatch({ type: MOVE_TO_SORTING_HAT });
  };
};

export const onMatches = () => {
  return function(dispatch) {
    dispatch({ type: MOVE_TO_MATCHES });
  };
};

export const onConversations = () => {
  return function(dispatch) {
    dispatch({ type: MOVE_TO_CONVERSATIONS });
  };
};

export const onFooter = () => {
  return function(dispatch) {
    dispatch({ type: MOVE_TO_FOOTER });
  };
};

export const generateRandomColorTheme = () => async dispatch => {
  dispatch({ type: SAVE_COLOR_THEME_START });
  let isGrey_1 = Math.floor(Math.random() * 2) < 0.5;
  let colorPallateIndex = Math.floor(Math.random() * 9); // multiply by 12 if yellow and yellow orange are used
  let savedBackgroundColor = GREY_1;
  if (isGrey_1) {
    dispatch(
      _generateColorThemeBasedOnBackground(colorPallateIndex, GREY_1, null)
    );
  } else {
    dispatch(
      _generateColorThemeBasedOnBackground(colorPallateIndex, GREY_9, null)
    );
    savedBackgroundColor = GREY_9;
  }

  const colorTheme = {
    savedBackgroundColor: savedBackgroundColor,
    savedColorPallateIndex: colorPallateIndex
  };
  const response = await axios.put("/api/profile/colorTheme", colorTheme);

  if (response.status === 200) {
    dispatch({ type: SAVE_COLOR_THEME_DONE });
  } else {
    dispatch({ type: SAVE_COLOR_THEME_ERROR });
  }
};

export const updateWithSavedColorTheme = async (dispatch, savedColorTheme) => {
  dispatch(
    _generateColorThemeBasedOnBackground(
      null,
      savedColorTheme.savedBackgroundColor,
      savedColorTheme.savedColorPallateIndex
    )
  );
};

function _generateColorThemeBasedOnBackground(
  newColorPallateIndex,
  oldBackgroundColor,
  savedColorPallateIndex
) {
  let colorPallateIndex = newColorPallateIndex;
  let newBackgroundColor = GREY_1;
  if (savedColorPallateIndex !== null) {
    colorPallateIndex = savedColorPallateIndex;
  }
  let newKey = colors5[colorPallateIndex].key;
  let newKeyCompliment1 = colors5[colorPallateIndex].keyCompliment1;
  let newKeyCompliment1Text8Color = colors2[colorPallateIndex].keyCompliment1;
  let newKeyCompliment2 = colors5[colorPallateIndex].keyCompliment2;
  let newThirdColor = colors5[colorPallateIndex].thirdColor;
  let newText1Color = GREY_9;
  let newText2Color = GREY_8;
  let newText3Color = GREY_7;
  let newText4Color = GREY_6;
  let newText5Color = GREY_5;
  let newText6Color = GREY_4;
  let newText7Color = GREY_3;
  let newText8Color = GREY_2;
  let newText9Dot5Color = GREY_DOT_5;
  let newKeyText1Color = colors9[colorPallateIndex].key;
  let newKeyText2Color = colors8[colorPallateIndex].key;
  let newKeyText3Color = colors7[colorPallateIndex].key;
  let newKeyText4Color = colors6[colorPallateIndex].key;
  let newKeyText5Color = colors5[colorPallateIndex].key;
  let newKeyText6Color = colors4[colorPallateIndex].key;
  let newKeyText7Color = colors3[colorPallateIndex].key;
  let newKeyText8Color = colors2[colorPallateIndex].key;

  if (oldBackgroundColor === GREY_1) {
    newBackgroundColor = GREY_9;
    newKeyCompliment1Text8Color = colors8[colorPallateIndex].keyCompliment1;
    newText1Color = GREY_1;
    newText2Color = GREY_2;
    newText3Color = GREY_3;
    newText4Color = GREY_4;
    newText5Color = GREY_5;
    newText6Color = GREY_6;
    newText7Color = GREY_7;
    newText8Color = GREY_8;
    newText9Dot5Color = GREY_9_DOT_5; //9.5
    newKeyText1Color = colors1[colorPallateIndex].key;
    newKeyText2Color = colors2[colorPallateIndex].key;
    newKeyText3Color = colors3[colorPallateIndex].key;
    newKeyText4Color = colors4[colorPallateIndex].key;
    newKeyText5Color = colors5[colorPallateIndex].key;
    newKeyText6Color = colors6[colorPallateIndex].key;
    newKeyText7Color = colors7[colorPallateIndex].key;
    newKeyText8Color = colors8[colorPallateIndex].key;
  }

  return {
    type: UPDATE_COLOR_THEME,
    backgroundColor: newBackgroundColor,
    key: newKey,
    keyCompliment1: newKeyCompliment1,
    keyCompliment1Text8Color: newKeyCompliment1Text8Color,
    keyCompliment2: newKeyCompliment2,
    thirdColor: newThirdColor,
    textDot5Color: newText9Dot5Color,
    text1Color: newText1Color,
    text2Color: newText2Color,
    text3Color: newText3Color,
    text4Color: newText4Color,
    text5Color: newText5Color,
    text6Color: newText6Color,
    text7Color: newText7Color,
    text8Color: newText8Color,
    keyText1Color: newKeyText1Color,
    keyText2Color: newKeyText2Color,
    keyText3Color: newKeyText3Color,
    keyText4Color: newKeyText4Color,
    keyText5Color: newKeyText5Color,
    keyText6Color: newKeyText6Color,
    keyText7Color: newKeyText7Color,
    keyText8Color: newKeyText8Color
  };
}
