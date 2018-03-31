import {
	ON_CHANGE_TYPED_MESSAGE,
	MOVE_TO_CONVERSATIONS,
	MOVE_TO_CONVERSATIONS_ERROR
} from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	contacts: []
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case ON_CHANGE_TYPED_MESSAGE:
			return newState;
		case MOVE_TO_CONVERSATIONS:
			console.log('conversations = ', action.conversations);
		case MOVE_TO_CONVERSATIONS_ERROR:

		default:
			return state;
	}
}
