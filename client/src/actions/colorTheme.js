import { UPDATE_COLOR_THEME } from './types';
import {
	colorsHashtable5,
	GREY_1,
	GREY_3,
	GREY_5,
	GREY_7,
	GREY_9
} from '../components/styles/ColorConstants';

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
	let newButtonTextColor = GREY_9;
	if (oldBackgroundColor === GREY_1) {
		newBackgroundColor = GREY_9;
		newText1Color = GREY_1;
		newText2Color = GREY_3;
		newText3Color = GREY_5;
		newButtonTextColor = GREY_1;
	}

	return {
		type: UPDATE_COLOR_THEME,
		keyColor: colorsHashtable5[colorPallateIndex].keyColor,
		keyComplimentColor:
			colorsHashtable5[colorPallateIndex].keyComplimentColor,
		thirdColor: colorsHashtable5[colorPallateIndex].thirdColor,
		backgroundColor: newBackgroundColor,
		text1Color: newText1Color,
		text2Color: newText2Color,
		text3Color: newText3Color,
		buttonTextColor: newButtonTextColor
	};
}
