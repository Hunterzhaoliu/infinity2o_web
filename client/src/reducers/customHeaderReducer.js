import { UPDATE_WINDOW_DIMENSIONS, TOGGLE_MENU } from "../actions/types";

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	windowWidth: null,
	windowHeight: null,
	menuIsDisplayed: false
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case UPDATE_WINDOW_DIMENSIONS:
			newState.windowWidth = action.newWindowWidth;
			newState.windowHeight = action.newWindowHeight;
			return newState;
		case TOGGLE_MENU:
			newState.menuIsDisplayed = !state.menuIsDisplayed;
			return newState;
		default:
			return state;
	}
}
