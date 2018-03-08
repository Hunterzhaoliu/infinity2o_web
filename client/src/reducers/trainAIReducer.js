import { ON_VOTE, SAVE_FETCHED_ASKS } from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	current4DisplayedAsks: [null, null, null, null]
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case SAVE_FETCHED_ASKS:
			newState.current4DisplayedAsks = action.mostRecent4Asks.data;
			return newState;
		case ON_VOTE:
			console.log('action = ', action);
			//newState.answerChoosen = action.answerChoosen;
			return newState;
		default:
			return state;
	}
}
