import { ON_CHANGE_TYPED_MESSAGE } from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	displayMessages: [],
	typedMessage: null
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case ON_CHANGE_TYPED_MESSAGE:
			newState.typedMessage = action.newMessage;
			return newState;
		default:
			return state;
	}
}
