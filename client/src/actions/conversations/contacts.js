import axios from "axios";
import {
	UPDATE_CONTACTS,
	UPDATE_CONTACTS_ERROR,
	UPDATE_CHAT,
	UPDATE_CHAT_ERROR,
	ON_SELECT_CONTACT,
	SAVE_USER_CONVERSATIONS_SUCCESS,
	SAVE_USER_CONVERSATIONS_ERROR,
	SEEN_MESSAGES
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
			if (
				updatedUserConversations !== undefined &&
				updatedUserConversations.length >= 1
			) {
				const conversationId =
					updatedUserConversations[contactChatDisplayIndex].conversationId;
				const contactIsOnline =
					updatedUserConversations[contactChatDisplayIndex].isOnline;
				const contactSocketId =
					updatedUserConversations[contactChatDisplayIndex].socketId;
				const contactMongoDBUserId =
					updatedUserConversations[contactChatDisplayIndex].matchId;
				const numberOfUnseenMessages =
					updatedUserConversations[contactChatDisplayIndex]
						.numberOfUnseenMessages;

				selectContact(
					conversationId,
					contactIsOnline,
					contactSocketId,
					contactMongoDBUserId,
					numberOfUnseenMessages,
					dispatch
				);
			}
		} else {
			dispatch({ type: UPDATE_CONTACTS_ERROR });

			dispatch({ type: SAVE_USER_CONVERSATIONS_ERROR });
		}
	}
};

const selectContact = async (
	conversationId,
	contactIsOnline,
	contactSocketId,
	contactMongoDBUserId,
	numberOfUnseenMessages,
	dispatch
) => {
	dispatch({
		type: ON_SELECT_CONTACT,
		conversationId: conversationId,
		contactIsOnline: contactIsOnline,
		contactSocketId: contactSocketId,
		contactMongoDBUserId: contactMongoDBUserId
	});

	// get previous messages in DB
	const response = await axios.get(
		"/api/conversations?conversationId=" + conversationId
	);

	if (response.status === 200) {
		dispatch({
			type: UPDATE_CHAT,
			last50Messages: response.data.last50Messages
		});

		if (numberOfUnseenMessages >= 1) {
			dispatch({
				type: SEEN_MESSAGES,
				conversationId: conversationId,
				numberOfUnseenMessages: numberOfUnseenMessages
			});
			const seenMessagesInfo = {
				conversationId: conversationId,
				numberOfUnseenMessages: numberOfUnseenMessages
			};
			await axios.put("/api/profile/seen_messages", seenMessagesInfo);
		}
	} else {
		dispatch({ type: UPDATE_CHAT_ERROR });
	}
};

export const onSelectContact = (
	conversationId,
	contactIsOnline,
	contactSocketId,
	contactMongoDBUserId,
	numberOfUnseenMessages
) => async dispatch => {
	selectContact(
		conversationId,
		contactIsOnline,
		contactSocketId,
		contactMongoDBUserId,
		numberOfUnseenMessages,
		dispatch
	);
};
