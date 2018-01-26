import { UPDATE_COLOR_THEME } from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	keyColor: null,
	keyComplimentColor: null,
	thirdColor: null,
	backgroundColor: null,
	text1Color: null,
	text2Color: null,
	text3Color: null,
	buttonTextColor: null
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case UPDATE_COLOR_THEME:
			newState.keyColor = action.keyColor;
			newState.keyComplimentColor = action.keyComplimentColor;
			newState.thirdColor = action.thirdColor;
			newState.backgroundColor = action.backgroundColor;
			newState.text1Color = action.text1Color;
			newState.text2Color = action.text2Color;
			newState.text3Color = action.text3Color;
			newState.buttonTextColor = action.buttonTextColor;
			console.log(
				'reducing action SWITCH_COLOR_MODE newState = ' +
					JSON.stringify(newState)
			);
			return newState;
		default:
			return state || newState;
	}
}
