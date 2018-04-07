import { SAVE_FETCHED_USER_AUTH, UPDATE_OUR_SOCKET_ID } from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	loggedInState: 'not_logged_in',
	googleId: null,
	linkedInId: null,
	location: null,
	mongoDBUserId: null,
	ourSocketId: null
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case SAVE_FETCHED_USER_AUTH:
			// when action.auth is undefined newState = initialState
			newState = action.auth || initialState;
			if (
				action.auth !== undefined &&
				(action.auth.googleId || action.auth.linkedInId)
			) {
				newState.loggedInState = 'logged_in';
				newState.mongoDBUserId = action.mongoDBUserId;
			}
			return newState;
		case UPDATE_OUR_SOCKET_ID:
			newState.ourSocketId = action.ourSocketId;
			return newState;
		default:
			return state;
	}
}
