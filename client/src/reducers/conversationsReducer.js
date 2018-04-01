import {
	ON_CHANGE_TYPED_MESSAGE,
	UPDATE_CONTACTS,
	UPDATE_CONTACTS_ERROR,
	DELETE_MATCH_IN_DB,
	DELETE_MATCH_IN_DB_ERROR
} from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	contacts: [],
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
			return newState;
		case UPDATE_CONTACTS_ERROR:
			newState.hasContactsError = true;
			return newState;
		case DELETE_MATCH_IN_DB:
			return newState;
		case DELETE_MATCH_IN_DB_ERROR:
			newState.hasDeleteMatchInDBError = true;
			return newState;
		default:
			return state;
	}
}
