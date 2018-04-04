import axios from 'axios';
import {
	UPDATE_CONTACTS,
	UPDATE_CONTACTS_ERROR,
	UPDATE_CHAT,
	UPDATE_CHAT_ERROR,
	SET_LOADING,
	SET_HAS_MORE,
	DISPLAY_MORE_CONTACTS,
	ON_SELECT_CONTACT
} from './types';
import { socket } from './chat';
import { store } from '../index';

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
				isOnline:
					response.data.conversations[contactChatDisplayIndex]
						.isOnline
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

export const onSelectContact = (conversationId, isOnline) => async dispatch => {
	dispatch({
		type: ON_SELECT_CONTACT,
		conversationId: conversationId,
		isOnline: isOnline
	});

	// get previous messages in DB
	const response = await axios.get(
		'/api/conversations?conversationId=' + conversationId
	);

	if (response.status === 200) {
		dispatch({
			type: UPDATE_CHAT,
			last50Messages: response.data.last50Messages
		});
	} else {
		dispatch({ type: UPDATE_CHAT_ERROR });
	}
};

export const tellServerIAmInConversations = (
	mongoDBUserId,
	allContacts
) => dispatch => {
	socket.emit('TELL_SERVER_CLIENT_IS_IN_CONVERSATIONS', {
		mongoDBUserId: mongoDBUserId,
		allContacts: allContacts,
		socketId: socket.id
	});
};

socket.on('TELL_CLIENT_ONLINE_CONTACTS', async function(allContacts) {
	const response = await axios.put('/api/profile', allContacts);
	if (response.status === 200) {
		store.dispatch({
			type: UPDATE_CONTACTS,
			allContacts: allContacts
		});
	} else {
		store.dispatch({ type: UPDATE_CONTACTS_ERROR });
	}
});
