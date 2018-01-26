import { FETCH_USER } from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	userInfo: {
		_id: null,
		googleId: null,
		__v: null,
		credits: null
	}
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case FETCH_USER:
			newState.userInfo = action.payload.data || false;
			return newState;
		default:
			return state;
	}
}
