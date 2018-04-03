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

export const fetchConversations = () => async dispatch => {
	// get user by hitting GET api/current_user
	const response = await axios.get('/api/current_user');

	if (response.status === 200) {
		// dispatch user.conversations.contacts -> state
		dispatch({
			type: UPDATE_CONTACTS,
			allContacts: response.data.conversations
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

export const onSelectContact = conversationId => dispatch => {
	dispatch({
		type: ON_SELECT_CONTACT,
		conversationId: conversationId
	});

	// TODO: get previous messages in DB
};
