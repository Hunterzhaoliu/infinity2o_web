import { UPDATE_COLOR_THEME } from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	key: null,
	keyCompliment1: null,
	keyCompliment2: null,
	thirdColor: null,
	backgroundColor: null,
	text1Color: null,
	text2Color: null,
	text3Color: null,
	text4Color: null,
	text5Color: null,
	text6Color: null,
	text7Color: null,
	text8Color: null
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case UPDATE_COLOR_THEME:
			newState.key = action.key;
			newState.keyCompliment1 = action.keyCompliment1;
			newState.keyCompliment2 = action.keyCompliment2;
			newState.thirdColor = action.thirdColor;
			newState.backgroundColor = action.backgroundColor;
			newState.text1Color = action.text1Color;
			newState.text2Color = action.text2Color;
			newState.text3Color = action.text3Color;
			newState.text4Color = action.text4Color;
			newState.text5Color = action.text5Color;
			newState.text6Color = action.text6Color;
			newState.text7Color = action.text7Color;
			newState.text8Color = action.text8Color;
			return newState;
		default:
			return state || newState;
	}
}
