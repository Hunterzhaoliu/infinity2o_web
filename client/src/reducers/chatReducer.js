import {
	ON_CHANGE_TYPED_MESSAGE,
	UPDATE_CHAT,
	UPDATE_CHAT_ERROR
} from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	displayMessages: [],
	typedMessage: null,
	hasUpdateChatError: false
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case ON_CHANGE_TYPED_MESSAGE:
			newState.typedMessage = action.newMessage;
			return newState;
		case UPDATE_CHAT:
			newState.displayMessages = action.last50Messages;
			return newState;
		case UPDATE_CHAT_ERROR:
			newState.hasUpdateChatError = true;
			return newState;
		default:
			return state;
	}
}
