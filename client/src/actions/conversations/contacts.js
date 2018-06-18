import axios from 'axios';
import {
	UPDATE_CONTACTS,
	UPDATE_CONTACTS_ERROR,
	UPDATE_CHAT,
	UPDATE_CHAT_ERROR,
	ON_SELECT_CONTACT,
	TOLD_DB_CLIENT_IN_CONVERSATION,
	TOLD_DB_CLIENT_IN_CONVERSATION_ERROR,
	SAVE_USER_CONVERSATIONS_SUCCESS,
	SAVE_USER_CONVERSATIONS_ERROR,
	UPDATE_OUR_SOCKET_ID,
	UPDATE_CONTACT_SOCKET_ID
} from '../types';
import { store } from '../../index';
import io from 'socket.io-client';

export let socket = io(process.env.REACT_APP_SOCKET_DOMAIN, {
	reconnect: true,
	transports: ['websocket', 'polling']
});

export const fetchConversations = () => async dispatch => {
	// 1) hit /api/current_user to get allContacts
	const userResponse = await axios.get('/api/current_user');

	if (userResponse.status === 200) {
		// 2) display chat log of first conversation
		const contactChatDisplayIndex = 0;
		let conversationId;
		if (
			userResponse.data.conversations !== undefined &&
			userResponse.data.conversations.length >= 1
		) {
			conversationId =
				userResponse.data.conversations[contactChatDisplayIndex]
					.conversationId;

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
						userResponse.data.conversations[contactChatDisplayIndex]
							.isOnline,
					socketId:
						userResponse.data.conversations[contactChatDisplayIndex]
							.socketId
				});
				dispatch({
					type: UPDATE_CHAT,
					last50Messages: conversationsResponse.data.last50Messages
				});
			} else {
				dispatch({ type: UPDATE_CHAT_ERROR });
			}
		}

		// 3) tell client in conversation DB we have a new client
		// by hitting /api/conversations/clients_online to get allContacts with latest socketIds
		const allContacts = userResponse.data.conversations;
		const mongoDBUserId = store.getState().auth.mongoDBUserId;
		const clientInConversationInfo = {
			mongoDBUserId: mongoDBUserId,
			allContacts: allContacts,
			socketId: socket.id
		};
		const onlineContactsResponse = await axios.post(
			'/api/conversations/clients_online',
			clientInConversationInfo
		);
		if (onlineContactsResponse.status === 200) {
			// 4) update our socket id
			dispatch({
				type: UPDATE_OUR_SOCKET_ID,
				ourSocketId: socket.id
			});
			dispatch({
				type: TOLD_DB_CLIENT_IN_CONVERSATION
			});

			// 5) dispatch allContacts (with lastest socketIds) to our state
			const onlineContacts = onlineContactsResponse.data;
			dispatch({
				type: UPDATE_CONTACTS,
				allContacts: onlineContacts
			});

			// 6) save allContacts (with lastest socketIds) to User DB
			const updateUserDBResponse = await axios.put(
				'/api/profile/conversations',
				onlineContacts
			);
			if (updateUserDBResponse.status === 200) {
				dispatch({ type: SAVE_USER_CONVERSATIONS_SUCCESS });
			} else {
				dispatch({ type: SAVE_USER_CONVERSATIONS_ERROR });
			}
		} else {
			store.dispatch({ type: TOLD_DB_CLIENT_IN_CONVERSATION_ERROR });
		}
	} else {
		dispatch({ type: UPDATE_CONTACTS_ERROR });
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

socket.on('TELL_CLIENT_X:ONE_OF_YOUR_CONTACTS_IS_ONLINE', function(
	newContactInfo
) {
	// console.log(
	//   "TELL_CLIENT_X:ONE_OF_YOUR_CONTACTS_IS_ONLINE newContactInfo = ",
	//   newContactInfo
	// );
	store.dispatch({
		type: UPDATE_CONTACT_SOCKET_ID,
		newContactInfo: newContactInfo
	});
});
