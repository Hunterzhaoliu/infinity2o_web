import {
	UPDATE_CONTACTS,
	UPDATE_CONTACTS_ERROR,
	SET_LOADING,
	SET_HAS_MORE,
	DISPLAY_MORE_CONTACTS,
	ON_SELECT_CONTACT,
	TOLD_DB_CLIENT_IN_CONVERSATION,
	TOLD_DB_CLIENT_IN_CONVERSATION_ERROR,
	SAVE_USER_CONVERSATIONS_SUCCESS,
	SAVE_USER_CONVERSATIONS_ERROR,
	UPDATE_CONTACT_SOCKET_ID
} from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	allContacts: [],
	displayedContacts: [],
	i: 20, // initial max number of allContacts to display
	loading: false,
	hasMore: true,
	hasContactsError: false,
	conversationId: null,
	selectedContactOnline: false,
	selectedContactSocketId: null,
	hasToldDBClientInConversationError: false,
	hasSaveUserConversationsError: false
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case UPDATE_CONTACTS:
			newState.allContacts = action.allContacts;
			if (newState.allContacts !== undefined) {
				newState.displayedContacts = newState.allContacts.slice(
					0,
					newState.i
				);
			}

			newState.displayedContacts.forEach(function(contact) {
				if (contact.conversationId === newState.conversationId) {
					// we found the conversation both clients are in
					newState.selectedContactOnline = contact.isOnline;
					newState.selectedContactSocketId = contact.socketId;
				}
			});
			return newState;
		case UPDATE_CONTACTS_ERROR:
			newState.hasContactsError = true;
			return newState;
		case DISPLAY_MORE_CONTACTS:
			newState.displayedContacts.concat(
				newState.allContacts.slice(
					newState.i,
					newState.i + action.numberOfContacts
				)
			);
			newState.i += action.numberOfContacts;
			return newState;
		case SET_LOADING:
			newState.loading = action.loading;
			return newState;
		case SET_HAS_MORE:
			newState.hasMore = action.hasMore;
			return newState;
		case ON_SELECT_CONTACT:
			newState.conversationId = action.conversationId;
			newState.selectedContactOnline = action.isOnline;
			newState.selectedContactSocketId = action.socketId;
			return newState;
		case TOLD_DB_CLIENT_IN_CONVERSATION:
			newState.hasToldDBClientInConversationError = false;
			return newState;
		case TOLD_DB_CLIENT_IN_CONVERSATION_ERROR:
			newState.hasToldDBClientInConversationError = true;
			return newState;
		case SAVE_USER_CONVERSATIONS_SUCCESS:
			newState.hasSaveUserConversationsError = false;
			return newState;
		case SAVE_USER_CONVERSATIONS_ERROR:
			newState.hasSaveUserConversationsError = true;
			return newState;
		case UPDATE_CONTACT_SOCKET_ID:
			newState.allContacts.forEach(function(contact) {
				if (contact.matchId === action.newContactInfo.matchId) {
					// we found the contact we need to update socketId
					contact.socketId = action.newContactInfo.socketId;
					newState.selectedContactSocketId =
						action.newContactInfo.socketId;
				}
			});

			if (newState.allContacts !== undefined) {
				newState.displayedContacts = newState.allContacts.slice(
					0,
					newState.i
				);
			}
		default:
			return state;
	}
}
