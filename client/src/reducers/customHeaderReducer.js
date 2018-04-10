import { UPDATE_WINDOW_WIDTH } from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	windowWidth: null
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case UPDATE_WINDOW_WIDTH:
			newState.windowWidth = action.newWindowWidth;
			return newState;
		default:
			return state;
	}
}
