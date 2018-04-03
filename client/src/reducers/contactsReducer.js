import {
	ON_CHANGE_TYPED_MESSAGE,
	UPDATE_CONTACTS,
	UPDATE_CONTACTS_ERROR,
	DELETE_MATCH_IN_DB,
	DELETE_MATCH_IN_DB_ERROR,
	SET_LOADING,
	SET_HAS_MORE,
	DISPLAY_MORE_CONTACTS,
	ON_SELECT_CONTACT
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
	hasDeleteMatchInDBError: false,
	conversationId: null
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case ON_CHANGE_TYPED_MESSAGE:
			return newState;
		case UPDATE_CONTACTS:
			newState.allContacts = action.allContacts;
			if (newState.allContacts !== undefined) {
				newState.displayedContacts = newState.allContacts.slice(
					0,
					newState.i
				);
			}
			return newState;
		case UPDATE_CONTACTS_ERROR:
			newState.hasContactsError = true;
			return newState;
		case DELETE_MATCH_IN_DB:
			return newState;
		case DELETE_MATCH_IN_DB_ERROR:
			newState.hasDeleteMatchInDBError = true;
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
			return newState;
		default:
			return state;
	}
}
