import { ON_VOTE } from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	answeredQuestion: {}
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case ON_VOTE:
			console.log('action = ', action);
			//newState.answerChoosen = action.answerChoosen;
			return newState;
		default:
			return state;
	}
}
