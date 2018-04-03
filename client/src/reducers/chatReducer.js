import {
	ON_CHANGE_CURRENT_MESSAGE,
	UPDATE_CHAT,
	UPDATE_CHAT_ERROR,
	DISPLAY_MORE_MESSAGES,
	SET_CHAT_LOADING,
	SET_CHAT_HAS_MORE,
	DISPLAY_SENT_MESSAGE,
	MESSAGE_SENT_SUCCESS,
	MESSAGE_SENT_ERROR
} from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	i: 30, // initial max number of messages to display
	last50Messages: [],
	displayMessages: [],
	currentMessage: null,
	hasUpdateChatError: false,
	partnerOnline: false
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case ON_CHANGE_CURRENT_MESSAGE:
			newState.currentMessage = action.newMessage;
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
		case DISPLAY_SENT_MESSAGE:
			newState.last50Messages.push({
				senderName: action.senderName,
				contents: newState.currentMessage,
				status: 'sent'
			});
			if (newState.last50Messages.length > 50) {
				newState.last50Messages.shift();
			}

			newState.displayMessages.push({
				senderName: action.senderName,
				contents: newState.currentMessage,
				status: 'sent'
			});
			if (newState.displayMessages.length > 50) {
				newState.displayMessages.shift();
			}
			newState.currentMessage = null;
			return newState;
		case MESSAGE_SENT_SUCCESS:
			const lastMessageIndex1 = newState.last50Messages.length - 1;
			newState.last50Messages[lastMessageIndex1].status = 'delivered';

			const lastDisplayMessagesIndex1 =
				newState.displayMessages.length - 1;
			newState.displayMessages[lastDisplayMessagesIndex1].status =
				'delivered';
			return newState;
		case MESSAGE_SENT_ERROR:
			const lastMessageIndex2 = newState.last50Messages.length - 1;
			newState.last50Messages[lastMessageIndex2].status =
				'failed-delivery';

			const lastDisplayMessagesIndex2 =
				newState.displayMessages.length - 1;
			newState.displayMessages[lastDisplayMessagesIndex2].status =
				'failed-delivery';
			return newState;
		default:
			return state;
	}
}
