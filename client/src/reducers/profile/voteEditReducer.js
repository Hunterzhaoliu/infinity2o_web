import { ON_PRESS_PAGE } from '../../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	page: 1
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case ON_PRESS_PAGE:
			newState.page = action.newPage;
			return newState;
		default:
			return state;
	}
}
