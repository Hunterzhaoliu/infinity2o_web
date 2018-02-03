import { UPDATE_COLOR_THEME } from './types';
import {
	colorsHashtable5,
	GREY_1,
	GREY_3,
	GREY_5,
	GREY_7,
	GREY_9
} from '../components/styles/ColorConstants';

export const actionCreators = {
	generateRandomColorTheme: () => dispatch => {
		const isGrey_1 = Math.floor(Math.random() * 2) < 0.5;
		if (isGrey_1) {
			return _generateColorThemeBasedOnBackground(GREY_1);
		} else {
			return _generateColorThemeBasedOnBackground(GREY_9);
		}
	}
};

export const generateRandomColorTheme = () => {
	return function(dispatch) {
		let isGrey_1 = Math.floor(Math.random() * 2) < 0.5;
		if (isGrey_1) {
			dispatch(_generateColorThemeBasedOnBackground(GREY_1));
		} else {
			dispatch(_generateColorThemeBasedOnBackground(GREY_9));
		}
	};
};

function _generateColorThemeBasedOnBackground(oldBackgroundColor) {
	const colorPallateIndex = Math.floor(Math.random() * 12);
	let newBackgroundColor = GREY_1;
	let newText1Color = GREY_9;
	let newText2Color = GREY_7;
	let newText3Color = GREY_5;
	let newText4Color = GREY_3;
	if (oldBackgroundColor === GREY_1) {
		newBackgroundColor = GREY_9;
		newText1Color = GREY_1;
		newText2Color = GREY_3;
		newText3Color = GREY_5;
		newText4Color = GREY_7;
	}

	return {
		type: UPDATE_COLOR_THEME,
		key: colorsHashtable5[colorPallateIndex].key,
		keyCompliment1: colorsHashtable5[colorPallateIndex].keyCompliment1,
		keyCompliment2: colorsHashtable5[colorPallateIndex].keyCompliment2,
		thirdColor: colorsHashtable5[colorPallateIndex].thirdColor,
		backgroundColor: newBackgroundColor,
		text1Color: newText1Color,
		text2Color: newText2Color,
		text3Color: newText3Color,
		text4Color: newText4Color
	};
}
