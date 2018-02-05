import { UPDATE_COLOR_THEME } from './types';
import {
	colorsHashtable5,
	GREY_1,
	GREY_2,
	GREY_3,
	GREY_4,
	GREY_5,
	GREY_6,
	GREY_7,
	GREY_8,
	GREY_9
} from '../containers/styles/ColorConstants';

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
	let newText2Color = GREY_8;
	let newText3Color = GREY_7;
	let newText4Color = GREY_6;
	let newText5Color = GREY_5;
	let newText6Color = GREY_4;
	let newText7Color = GREY_3;
	let newText8Color = GREY_2;
	if (oldBackgroundColor === GREY_1) {
		newBackgroundColor = GREY_9;
		newText1Color = GREY_1;
		newText2Color = GREY_2;
		newText3Color = GREY_3;
		newText4Color = GREY_4;
		newText5Color = GREY_5;
		newText6Color = GREY_6;
		newText7Color = GREY_7;
		newText8Color = GREY_8;
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
		text4Color: newText4Color,
		text5Color: newText5Color,
		text6Color: newText6Color,
		text7Color: newText7Color,
		text8Color: newText8Color
	};
}
