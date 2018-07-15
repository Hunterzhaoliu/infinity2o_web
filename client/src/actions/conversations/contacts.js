import axios from 'axios';
import {
	UPDATE_CONTACTS,
	UPDATE_CONTACTS_ERROR,
	UPDATE_CHAT,
	UPDATE_CHAT_ERROR,
	ON_SELECT_CONTACT,
	// SAVE_USER_CONVERSATIONS_SUCCESS,
	// SAVE_USER_CONVERSATIONS_ERROR,
	UPDATE_CONTACT_WITH_NEW_USER_SOCKET_ID,
	TOLD_DB_CLIENT_IS_ONLINE,
	TOLD_DB_CLIENT_IS_ONLINE_ERROR
} from '../types';
import { store } from '../../index';
import { clientSocket } from '../auth';

export const fetchConversations = () => async dispatch => {
	// 1) hit /api/current_user to get allContacts
	const userResponse = await axios.get('/api/current_user');

	if (userResponse.status === 200) {
		// 2) display chat log of first conversation
		const contactChatDisplayIndex = 0;
		let conversationId;
		const userConversations = userResponse.data.conversation;
		if (userConversations !== undefined && userConversations.length >= 1) {
			conversationId =
				userConversations[contactChatDisplayIndex].conversationId;

			// get chat logs by hitting GET api/conversations
			const conversationsResponse = await axios.get(
				'/api/conversations?conversationId=' + conversationId
			);

			if (conversationsResponse.status === 200) {
				// dispatch chat logs for the latest messages
				dispatch({
					type: ON_SELECT_CONTACT,
					conversationId: conversationId,
					isOnline:
						userConversations[contactChatDisplayIndex].isOnline,
					socketId:
						userConversations[contactChatDisplayIndex].socketId
				});
				dispatch({
					type: UPDATE_CHAT,
					last50Messages: conversationsResponse.data.last50Messages
				});
			} else {
				dispatch({ type: UPDATE_CHAT_ERROR });
			}

			// 3) update user with up to date contact clientSocket ids
			console.log('userConversations = ', userConversations);

			const onlineContactsResponse = await axios.get(
				'/api/conversations/user_contacts_online_status?allContacts=' +
					userConversations
			);

			if (onlineContactsResponse.status === 200) {
				const onlineContacts = onlineContactsResponse.data;
				dispatch({
					type: UPDATE_CONTACTS,
					allContacts: onlineContacts
				});
			} else {
				dispatch({ type: UPDATE_CONTACTS_ERROR });
			}

			// // 4) save updated user contacts into DB
			// const updateUserDBResponse = await axios.put(
			// 	'/api/profile/conversations',
			// 	onlineContacts
			// );
			// if (updateUserDBResponse.status === 200) {
			// 	dispatch({ type: SAVE_USER_CONVERSATIONS_SUCCESS });
			// } else {
			// 	dispatch({ type: SAVE_USER_CONVERSATIONS_ERROR });
			// }
		}
	}
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
			type: TOLD_DB_CLIENT_IS_ONLINE
		});
		dispatch({
			type: UPDATE_CHAT,
			last50Messages: response.data.last50Messages
		});
	} else {
		dispatch({ type: TOLD_DB_CLIENT_IS_ONLINE_ERROR });
	}
};

if (clientSocket !== undefined) {
	clientSocket.on('TELL_CONTACT_X:ONE_OF_YOUR_CONTACTS_IS_ONLINE', function(
		newContactInfo
	) {
		console.log(
			'TELL_CONTACT_X:ONE_OF_YOUR_CONTACTS_IS_ONLINE newContactInfo = ',
			newContactInfo
		);
		// telling the user contacts the user's new clientSocket id
		store.dispatch({
			type: UPDATE_CONTACT_WITH_NEW_USER_SOCKET_ID,
			newContactInfo: newContactInfo
		});
	});
}
