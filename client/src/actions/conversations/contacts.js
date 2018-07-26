import axios from "axios";
import {
	UPDATE_CONTACTS,
	UPDATE_CONTACTS_ERROR,
	UPDATE_CHAT,
	UPDATE_CHAT_ERROR,
	ON_SELECT_CONTACT,
	SAVE_USER_CONVERSATIONS_SUCCESS,
	SAVE_USER_CONVERSATIONS_ERROR,
	TOLD_REDIS_CLIENT_IS_ONLINE,
	TOLD_REDIS_CLIENT_IS_ONLINE_ERROR
} from "../types";

export const fetchConversations = () => async dispatch => {
	// 1) hit /api/current_user to get allContacts
	const userResponse = await axios.get("/api/current_user");
	if (userResponse.status === 200) {
		const userConversations = userResponse.data.conversations.userConversations;
		// 2) update user conversations with newest contact clientSocket ids
		const updatedUserConversationsResponse = await axios.put(
			"/api/conversations/online_contacts",
			userConversations
		);

		if (updatedUserConversationsResponse.status === 200) {
			const updatedUserConversations = updatedUserConversationsResponse.data;
			dispatch({
				type: UPDATE_CONTACTS,
				allContacts: updatedUserConversations
			});
			dispatch({ type: SAVE_USER_CONVERSATIONS_SUCCESS });

			const contactChatDisplayIndex = 0;

			// 3) display chat log of first conversation
			let conversationId;
			if (
				updatedUserConversations !== undefined &&
				updatedUserConversations.length >= 1
			) {
				conversationId =
					updatedUserConversations[contactChatDisplayIndex].conversationId;

				// get chat logs by hitting GET api/conversations
				const conversationsResponse = await axios.get(
					"/api/conversations?conversationId=" + conversationId
				);

				if (conversationsResponse.status === 200) {
					// dispatch chat logs for the latest messages
					dispatch({
						type: ON_SELECT_CONTACT,
						conversationId: conversationId,
						contactIsOnline:
							updatedUserConversations[contactChatDisplayIndex].isOnline,
						contactSocketId:
							updatedUserConversations[contactChatDisplayIndex].socketId,
						contactMongoDBUserId:
							updatedUserConversations[contactChatDisplayIndex].matchId
					});
					dispatch({
						type: UPDATE_CHAT,
						last50Messages: conversationsResponse.data.last50Messages
					});
				} else {
					dispatch({ type: UPDATE_CHAT_ERROR });
				}
			}
		} else {
			dispatch({ type: UPDATE_CONTACTS_ERROR });

			dispatch({ type: SAVE_USER_CONVERSATIONS_ERROR });
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
		"/api/conversations?conversationId=" + conversationId
	);

	if (response.status === 200) {
		dispatch({
			type: TOLD_REDIS_CLIENT_IS_ONLINE
		});
		dispatch({
			type: UPDATE_CHAT,
			last50Messages: response.data.last50Messages
		});
	} else {
		dispatch({ type: TOLD_REDIS_CLIENT_IS_ONLINE_ERROR });
	}
};
