import { UPDATE_WINDOW_WIDTH, TOGGLE_SIDER } from "../actions/types";

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	windowWidth: null,
	siderDisplay: false
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case UPDATE_WINDOW_WIDTH:
			newState.windowWidth = action.newWindowWidth;
			return newState;
		case TOGGLE_SIDER:
			newState.siderDisplay = !state.siderDisplay;
			return newState;
		default:
			return state;
	}
}
