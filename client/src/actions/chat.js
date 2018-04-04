import axios from 'axios';
import {
	ON_CHANGE_CURRENT_MESSAGE,
	SET_CHAT_LOADING,
	SET_CHAT_HAS_MORE,
	DISPLAY_MORE_MESSAGES,
	DISPLAY_SENT_MESSAGE,
	MESSAGE_SENT_SUCCESS,
	MESSAGE_SENT_ERROR
} from './types';
import io from 'socket.io-client';
export const socket = io('localhost:5000');

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

export const sendMessageToServer = (
	conversationId,
	selectedContactOnline,
	name,
	currentMessage
) => async dispatch => {
	dispatch({
		type: DISPLAY_SENT_MESSAGE,
		senderName: name
	});

	const timeCreated = Date.now();
	if (selectedContactOnline) {
		// use websockets for live chat
		socket.emit('SEND_MESSAGE_FROM_CLIENT_TO_SERVER', {
			senderName: name,
			message: currentMessage,
			timeCreated: timeCreated
		});
	}
	// save sent message into database
	const messageInfo = {
		conversationId: conversationId,
		senderName: name,
		message: currentMessage,
		timeCreated: timeCreated
	};
	const response = await axios.post('/api/conversations/chat', messageInfo);
	if (response.status === 200) {
		dispatch({
			type: MESSAGE_SENT_SUCCESS
		});
	} else {
		dispatch({ type: MESSAGE_SENT_ERROR });
	}
};
