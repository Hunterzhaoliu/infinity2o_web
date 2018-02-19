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
	name: null,
	age: null,
	interests: null,
	timeZone: null,
	availability: null,
	newName: null,
	newAge: null,
	newInterests: null,
	newTimeZone: null,
	newAvailability: null,
	hasAgeError: false,
	hasNameError: false,
	hasInterestsError: false
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case SAVE_FETCHED_USER_PROFILE:
			newState = action.profile || false;
			return newState;
		case ON_CHANGE_NAME:
			newState.newName = action.newName;
			newState.hasNameError = action.hasError;
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
