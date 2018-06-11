import { SAVE_FETCHED_LANDING_ASKS } from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	landingAsks: []
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case SAVE_FETCHED_LANDING_ASKS:
			newState.landingAsks = action.landingAsks;
			return newState;
		default:
			return state;
	}
}
