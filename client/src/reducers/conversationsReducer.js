import {
	ON_CHANGE_TYPED_MESSAGE,
	UPDATE_CONTACTS,
	UPDATE_CONTACTS_ERROR
} from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	contacts: []
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case ON_CHANGE_TYPED_MESSAGE:
			return newState;
		case UPDATE_CONTACTS:
			console.log('contacts = ', action.contacts);
			newState.contacts = action.contacts;
		case UPDATE_CONTACTS_ERROR:

		default:
			return state;
	}
}
