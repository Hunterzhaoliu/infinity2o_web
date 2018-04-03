import {
	ON_CHANGE_CURRENT_MESSAGE,
	SET_CHAT_LOADING,
	SET_CHAT_HAS_MORE,
	DISPLAY_MORE_MESSAGES,
	SEND_MESSAGE_TO_SERVER
} from './types';

export const onChangeCurrentMessage = newMessage => dispatch => {
	dispatch({
		type: ON_CHANGE_CURRENT_MESSAGE,
		newMessage: newMessage
	});
};

export const setLoading = (loading, dispatch) => {
	dispatch({
		type: SET_CHAT_LOADING,
		loading: loading
	});
};

export const setHasMore = (hasMore, dispatch) => {
	dispatch({
		type: SET_CHAT_HAS_MORE,
		hasMore: hasMore
	});
};

export const displayMoreMessages = (numberOfMessages, dispatch) => {
	dispatch({
		type: DISPLAY_MORE_MESSAGES,
		numberOfMessages: numberOfMessages
	});
};

export const sendMessageToServer = name => dispatch => {
	console.log('action name = ', name);
	dispatch({
		type: SEND_MESSAGE_TO_SERVER,
		senderName: name
	});
};
