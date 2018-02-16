import { FETCH_USER_AUTH } from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	googleId: null,
	linkedInId: null,
	location: null
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case FETCH_USER_AUTH:
			newState = action.auth || false;
			return newState;
		default:
			return state;
	}
}
