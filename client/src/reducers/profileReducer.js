import {
	SAVE_FETCHED_USER_PROFILE,
	ON_CHANGE_NAME,
	SAVE_PROFILE_START,
	SAVE_PROFILE_DONE
} from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	newAge: null,
	newName: null,
	newTimeZone: null,
	newAvailability: null,
	newInterests: null,
	age: null,
	name: null,
	timeZone: null,
	availability: null,
	interests: null
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case SAVE_FETCHED_USER_PROFILE:
			newState = action.profile || false;
			return newState;
		case ON_CHANGE_NAME:
			newState.newName = action.newName;
			return newState;
		case SAVE_PROFILE_START:
			return newState;
		case SAVE_PROFILE_DONE:
			newState = action.profile || false;
			return newState;
		default:
			return state;
	}
}
