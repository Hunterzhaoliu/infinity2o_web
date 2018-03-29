import { TEST } from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case TEST:
			return newState;
		default:
			return state;
	}
}
