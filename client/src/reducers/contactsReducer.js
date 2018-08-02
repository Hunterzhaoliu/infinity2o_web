import {
	UPDATE_CONTACTS,
	UPDATE_CONTACTS_ERROR,
	ON_SELECT_CONTACT,
	TOLD_REDIS_CLIENT_IS_ONLINE,
	TOLD_REDIS_CLIENT_IS_ONLINE_ERROR,
	SAVE_USER_CONVERSATIONS_SUCCESS,
	SAVE_USER_CONVERSATIONS_ERROR,
	UPDATE_CONTACT_WITH_NEW_USER_SOCKET_ID,
	NEW_MESSAGE,
	UPDATE_TOTAL_NUMBER_OF_UNSEEN_MESSAGES,
	SEEN_MESSAGES,
	UPDATE_SELECTED_CONTACT_INFO
} from "../actions/types";

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	allContacts: [],
	hasContactsError: false,
	selectedConversationInfo: {
		conversationId: null,
		selectedContactOnline: false,
		selectedContactSocketId: null,
		selectedContactMongoDBUserId: null,
		selectedContactMongoDBInfo: null
	},
	hasToldRedisClientOnlineError: false,
	hasSaveUserConversationsError: false,
	totalNumberOfUnseenMessages: 0
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case UPDATE_CONTACTS:
			newState.allContacts = action.allContacts;

			newState.allContacts.forEach(function(contact) {
				if (
					contact.conversationId ===
					newState.selectedConversationInfo.conversationId
				) {
					// we found the conversation both clients are in
					newState.selectedConversationInfo.selectedContactOnline =
						contact.isOnline;
					newState.selectedConversationInfo.selectedContactSocketId =
						contact.socketId;
				}
			});
			return newState;
		case UPDATE_CONTACTS_ERROR:
			newState.hasContactsError = true;
			return newState;
		case ON_SELECT_CONTACT:
			newState.selectedConversationInfo.conversationId = action.conversationId;
			newState.selectedConversationInfo.selectedContactOnline =
				action.contactIsOnline;
			newState.selectedConversationInfo.selectedContactSocketId =
				action.contactSocketId;
			newState.selectedConversationInfo.selectedContactMongoDBUserId =
				action.contactMongoDBUserId;
			return newState;
		case TOLD_REDIS_CLIENT_IS_ONLINE:
			newState.hasToldRedisClientOnlineError = false;
			return newState;
		case TOLD_REDIS_CLIENT_IS_ONLINE_ERROR:
			newState.hasToldRedisClientOnlineError = true;
			return newState;
		case SAVE_USER_CONVERSATIONS_SUCCESS:
			newState.hasSaveUserConversationsError = false;
			return newState;
		case SAVE_USER_CONVERSATIONS_ERROR:
			newState.hasSaveUserConversationsError = true;
			return newState;
		case UPDATE_CONTACT_WITH_NEW_USER_SOCKET_ID:
			// TODO: optimize
			newState.allContacts.forEach(function(contact) {
				if (contact.matchId === action.newUserSocketInfo.userId) {
					if (
						state.selectedConversationInfo.selectedContactSocketId ===
						contact.socketId
					) {
						// contact is also the currently selected contact
						newState.selectedConversationInfo.selectedContactOnline = true;
						newState.selectedConversationInfo.selectedContactSocketId =
							action.newUserSocketInfo.socketId;
					}
					// we found the contact that is online and are updating their socketId
					contact.socketId = action.newUserSocketInfo.socketId;
					contact.isOnline = true;
				}
			});
			return newState;
		case NEW_MESSAGE:
			// TODO: optimize
			newState.allContacts.forEach(function(contact) {
				if (contact.matchId === action.senderMongoDBUserId) {
					contact.numberOfUnseenMessages += 1;
				}
			});
			newState.totalNumberOfUnseenMessages += 1;
			return newState;
		case UPDATE_TOTAL_NUMBER_OF_UNSEEN_MESSAGES:
			newState.totalNumberOfUnseenMessages = action.totalNumberOfUnseenMessages;
			return newState;
		case SEEN_MESSAGES:
			newState.totalNumberOfUnseenMessages -= action.numberOfUnseenMessages;
			newState.allContacts.forEach(function(contact) {
				if (contact.conversationId === action.conversationId) {
					contact.numberOfUnseenMessages = 0;
				}
			});
			return newState;
		case UPDATE_SELECTED_CONTACT_INFO:
			newState.selectedConversationInfo.selectedContactMongoDBInfo =
				action.selectedContactInfo;
			return newState;
		default:
			return state;
	}
}
