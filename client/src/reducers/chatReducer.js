import {
	ON_CHANGE_TYPED_MESSAGE,
	UPDATE_CHAT,
	UPDATE_CHAT_ERROR,
	DISPLAY_MORE_MESSAGES,
	SET_CHAT_LOADING,
	SET_CHAT_HAS_MORE
} from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	i: 30, // initial max number of messages to display
	last50Messages: [],
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
			newState.last50Messages = action.last50Messages;
			newState.displayMessages = newState.last50Messages.slice(
				0,
				newState.i
			);
			return newState;
		case UPDATE_CHAT_ERROR:
			newState.hasUpdateChatError = true;
			return newState;
		case DISPLAY_MORE_MESSAGES:
			newState.displayMessages.concat(
				newState.last50Messages.slice(
					newState.i,
					newState.i + action.numberOfMessages
				)
			);
			newState.i += action.numberOfMessages;
			return newState;
		case SET_CHAT_LOADING:
			newState.loading = action.loading;
			return newState;
		case SET_CHAT_HAS_MORE:
			newState.hasMore = action.hasMore;
			return newState;
		default:
			return state;
	}
}
