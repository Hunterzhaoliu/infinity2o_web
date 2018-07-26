import {
	UPDATE_WINDOW_WIDTH,
	TOGGLE_SIDER,
	NEW_MESSAGE,
	UPDATE_TOTAL_NUMBER_OF_UNSEEN_MESSAGES
} from "../actions/types";

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	windowWidth: null,
	siderDisplay: false,
	totalNumberOfUnseenMessages: 0
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case UPDATE_WINDOW_WIDTH:
			newState.windowWidth = action.newWindowWidth;
			return newState;
		case UPDATE_TOTAL_NUMBER_OF_UNSEEN_MESSAGES:
			newState.totalNumberOfUnseenMessages = action.totalNumberOfUnseenMessages;
			return newState;
		case TOGGLE_SIDER:
			newState.siderDisplay = !state.siderDisplay;
			return newState;
		case NEW_MESSAGE:
			newState.totalNumberOfUnseenMessages += 1;
			return newState;
		default:
			return state;
	}
}
