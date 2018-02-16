import {
	SAVE_PROFILE_START,
	SAVE_PROFILE_DONE,
	FETCH_USER_PROFILE
} from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	age: null,
	name: null,
	time_zone: null,
	availability: null,
	interests: null
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case FETCH_USER_PROFILE:
			newState = action.profile || false;
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
