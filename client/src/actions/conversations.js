import axios from 'axios';
import {
	UPDATE_CONTACTS,
	UPDATE_CONTACTS_ERROR,
	UPDATE_CHAT,
	UPDATE_CHAT_ERROR
} from './types';

export const fetchConversations = () => async dispatch => {
	// get user by hitting GET api/current_user
	const response = await axios.get('/api/current_user');

	if (response.status === 200) {
		// dispatch user.conversation.contacts -> state
		dispatch({
			type: UPDATE_CONTACTS,
			contacts: response.data.conversations
		});
	} else {
		dispatch({ type: UPDATE_CONTACTS_ERROR });
	}

	// display chat log of first conversation
	const contactChatDisplayIndex = 0;
	const conversationId =
		response.data.conversations[contactChatDisplayIndex].conversationId;

	// get chat logs by hitting GET api/conversations
	const response2 = await axios.get(
		'/api/conversations?conversationId=' + conversationId
	);

	if (response2.status === 200) {
		// dispatch chat logs for the latest message
		dispatch({
			type: UPDATE_CHAT,
			last50Messages: response2.data.last50Messages
		});
	} else {
		dispatch({ type: UPDATE_CHAT_ERROR });
	}
};
