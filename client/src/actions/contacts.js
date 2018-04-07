import axios from 'axios';
import {
	UPDATE_CONTACTS,
	UPDATE_CONTACTS_ERROR,
	UPDATE_CHAT,
	UPDATE_CHAT_ERROR,
	SET_LOADING,
	SET_HAS_MORE,
	DISPLAY_MORE_CONTACTS,
	ON_SELECT_CONTACT,
	TOLD_DB_CLIENT_IN_CONVERSATION,
	TOLD_DB_CLIENT_IN_CONVERSATION_ERROR,
	SAVE_USER_CONVERSATIONS_SUCCESS,
	SAVE_USER_CONVERSATIONS_ERROR,
	UPDATE_OUR_SOCKET_ID,
	UPDATE_CONTACT_SOCKET_ID
} from './types';
import { store } from '../index';
import io from 'socket.io-client';
import keys from '../config/keys';
export let socket = io(keys.socketDomain);

export const fetchConversations = () => async dispatch => {
	// get user by hitting GET api/current_user
	const response = await axios.get('/api/current_user');

	if (response.status === 200) {
		// dispatch user.conversations.contacts -> state
		let allContacts = response.data.conversations;
		dispatch({
			type: UPDATE_CONTACTS,
			allContacts: allContacts
		});
	} else {
		dispatch({ type: UPDATE_CONTACTS_ERROR });
	}

	// display chat log of first conversation
	const contactChatDisplayIndex = 0;
	let conversationId;
	if (
		response.data.conversations !== undefined &&
		response.data.conversations.length >= 1
	) {
		conversationId =
			response.data.conversations[contactChatDisplayIndex].conversationId;

		// get chat logs by hitting GET api/conversations
		const response2 = await axios.get(
			'/api/conversations?conversationId=' + conversationId
		);

		if (response2.status === 200) {
			// dispatch chat logs for the latest messages
			dispatch({
				type: ON_SELECT_CONTACT,
				conversationId: conversationId,
				isOnline: response.data.conversations[contactChatDisplayIndex].isOnline,
				socketId: response.data.conversations[contactChatDisplayIndex].socketId
			});
			dispatch({
				type: UPDATE_CHAT,
				last50Messages: response2.data.last50Messages
			});
		} else {
			dispatch({ type: UPDATE_CHAT_ERROR });
		}
	}
};

export const setLoading = loading => dispatch => {
	dispatch({
		type: SET_LOADING,
		loading: loading
	});
};

export const setHasMore = hasMore => dispatch => {
	dispatch({
		type: SET_HAS_MORE,
		hasMore: hasMore
	});
};

export const displayMoreContacts = numberOfContacts => dispatch => {
	dispatch({
		type: DISPLAY_MORE_CONTACTS,
		numberOfContacts: numberOfContacts
	});
};

export const onSelectContact = (
	conversationId,
	isOnline,
	socketId
) => async dispatch => {
	dispatch({
		type: ON_SELECT_CONTACT,
		conversationId: conversationId,
		isOnline: isOnline,
		socketId: socketId
	});

	// get previous messages in DB
	const response = await axios.get(
		'/api/conversations?conversationId=' + conversationId
	);

	if (response.status === 200) {
		dispatch({
			type: TOLD_DB_CLIENT_IN_CONVERSATION
		});
		dispatch({
			type: UPDATE_CHAT,
			last50Messages: response.data.last50Messages
		});
	} else {
		dispatch({ type: TOLD_DB_CLIENT_IN_CONVERSATION_ERROR });
	}
};

export const tellServerClientInConversations = (
	mongoDBUserId,
	allContacts
) => async dispatch => {
	const clientInConversationInfo = {
		mongoDBUserId: mongoDBUserId,
		allContacts: allContacts,
		socketId: socket.id
	};
	// console.log('socket.id = ', socket.id);
	// puts the client inside of mongoDB clinetInConversationInfo collection
	// response holds the client's onlineContacts
	const response = await axios.post(
		'/api/conversations/clients_online',
		clientInConversationInfo
	);
	if (response.status === 200) {
		dispatch({
			type: UPDATE_OUR_SOCKET_ID,
			ourSocketId: socket.id
		});
		dispatch({
			type: TOLD_DB_CLIENT_IN_CONVERSATION
		});
		const onlineContacts = response.data;
		dispatch({
			type: UPDATE_CONTACTS,
			allContacts: onlineContacts
		});

		const response2 = await axios.put(
			'/api/profile/conversations',
			onlineContacts
		);
		if (response2.status === 200) {
			dispatch({ type: SAVE_USER_CONVERSATIONS_SUCCESS });
		} else {
			dispatch({ type: SAVE_USER_CONVERSATIONS_ERROR });
		}
	} else {
		store.dispatch({ type: TOLD_DB_CLIENT_IN_CONVERSATION_ERROR });
	}
};

socket.on('TELL_CLIENT_X:ONE_OF_YOUR_CONTACTS_IS_ONLINE', function(
	newContactInfo
) {
	console.log('newContactInfo = ', newContactInfo);
	store.dispatch({
		type: UPDATE_CONTACT_SOCKET_ID,
		newContactInfo: newContactInfo
	});
});
