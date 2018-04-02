import {
	ON_CHANGE_TYPED_MESSAGE,
	UPDATE_CONTACTS,
	UPDATE_CONTACTS_ERROR,
	DELETE_MATCH_IN_DB,
	DELETE_MATCH_IN_DB_ERROR,
	SET_LOADING,
	SET_HAS_MORE,
	DISPLAY_MORE_CONTACTS
} from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	contacts: [],
	displayedContacts: [],
	i: 20, // initial max number of contacts to display
	loading: false,
	hasMore: true,
	hasContactsError: false,
	hasDeleteMatchInDBError: false
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case ON_CHANGE_TYPED_MESSAGE:
			return newState;
		case UPDATE_CONTACTS:
			newState.contacts = action.contacts;
			if (newState.contacts !== undefined) {
				newState.displayedContacts = newState.contacts.slice(
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
				newState.contacts.slice(
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
		default:
			return state;
	}
}
