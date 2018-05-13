import {
	ON_PRESS_PAGE,
	FETCH_ASK_TO_REVOTE_START,
	FETCH_ASK_TO_REVOTE_DONE,
	FETCH_ASK_TO_REVOTE_ERROR
} from '../../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	page: 1,
	fetchState: {},
	askToRevote: null
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case ON_PRESS_PAGE:
			newState.page = action.newPage;
			return newState;
		case FETCH_ASK_TO_REVOTE_START:
			newState.fetchState[action.index] = 'start';
			return newState;
		case FETCH_ASK_TO_REVOTE_DONE:
			newState.fetchState[action.index] = 'done';
			newState.askToRevote = action.askToRevote;
			return newState;
		case FETCH_ASK_TO_REVOTE_ERROR:
			newState.fetchState[action.index] = 'error';
			return newState;
		default:
			return state;
	}
}
