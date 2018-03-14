import {
	UPDATE_COLOR_THEME,
	MOVE_TO_PROFILE,
	MOVE_TO_TRAIN_AI,
	MOVE_TO_MATCHES,
	MOVE_TO_SIGNED_IN_LANDING
} from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	backgroundColor: null,
	key: null,
	keyCompliment1: null,
	keyCompliment2: null,
	thirdColor: null,
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
	trainAIButtonColor: null,
	trainAIButtonTextColor: null,
	matchesButtonColor: null,
	matchesButtonTextColor: null
};

function _getStateForSection(newState) {
	if (newState.activeSection === 'train_ai') {
		newState.profileButtonColor = newState.text7Color;
		newState.profileButtonTextColor = newState.text4Color;
		newState.trainAIButtonColor = newState.key;
		newState.trainAIButtonTextColor = newState.text1Color;
		newState.matchesButtonColor = newState.text7Color;
		newState.matchesButtonTextColor = newState.text4Color;
	} else if (newState.activeSection === 'matches') {
		newState.profileButtonColor = newState.text7Color;
		newState.profileButtonTextColor = newState.text4Color;
		newState.trainAIButtonColor = newState.text7Color;
		newState.trainAIButtonTextColor = newState.text4Color;
		newState.matchesButtonColor = newState.key;
		newState.matchesButtonTextColor = newState.text1Color;
	} else if (newState.activeSection === 'profile') {
		newState.profileButtonColor = newState.key;
		newState.profileButtonTextColor = newState.text1Color;
		newState.trainAIButtonColor = newState.text7Color;
		newState.trainAIButtonTextColor = newState.text4Color;
		newState.matchesButtonColor = newState.text7Color;
		newState.matchesButtonTextColor = newState.text4Color;
	} else if (newState.activeSection === 'signed_in_landing') {
		newState.profileButtonColor = newState.text7Color;
		newState.profileButtonTextColor = newState.text4Color;
		newState.trainAIButtonColor = newState.text7Color;
		newState.trainAIButtonTextColor = newState.text4Color;
		newState.matchesButtonColor = newState.text7Color;
		newState.matchesButtonTextColor = newState.text4Color;
	}
	return newState;
}

function _updateColorTheme(newState, action) {
	newState.backgroundColor = action.backgroundColor;
	newState.keyBackgroundColor = action.keyBackgroundColor;
	newState.keyCompliment1BackgroundColor =
		action.keyCompliment1BackgroundColor;
	newState.keyCompliment2BackgroundColor =
		action.keyCompliment2BackgroundColor;
	newState.key = action.key;
	newState.keyCompliment1 = action.keyCompliment1;
	newState.keyCompliment2 = action.keyCompliment2;
	newState.thirdColor = action.thirdColor;
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
		case MOVE_TO_PROFILE:
			newState.activeSection = 'profile';
			newState = _getStateForSection(newState);
			return newState;
		case MOVE_TO_TRAIN_AI:
			newState.activeSection = 'train_ai';
			newState = _getStateForSection(newState);
			return newState;
		case MOVE_TO_MATCHES:
			newState.activeSection = 'matches';
			newState = _getStateForSection(newState);
			return newState;
		case MOVE_TO_SIGNED_IN_LANDING:
			newState.activeSection = 'signed_in_landing';
			newState = _getStateForSection(newState);
			return newState;
		default:
			return state || newState;
	}
}
