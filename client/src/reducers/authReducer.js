import { SAVE_FETCHED_USER_AUTH } from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	loggedIn: false,
	googleId: null,
	linkedInId: null,
	location: null,
	mongoDBUserId: null
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case SAVE_FETCHED_USER_AUTH:
			newState = action.auth || false;
			if (
				action.auth !== undefined &&
				(action.auth.googleId || action.auth.linkedInId)
			) {
				newState.loggedIn = true;
			}
			newState.mongoDBUserId = action.mongoDBUserId;
			return newState;
		default:
			return state;
	}
}
