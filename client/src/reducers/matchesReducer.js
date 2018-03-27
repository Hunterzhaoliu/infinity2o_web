import {
	SAVE_FETCHED_DAILY_MATCHES,
	UPDATE_INITIAL_MATCH
} from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	current1DisplayedMatches: [],
	nextMatches: []
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case SAVE_FETCHED_DAILY_MATCHES:
			newState.nextMatches = action.dailyMatches;
			return newState;
		case UPDATE_INITIAL_MATCH:
			// we move the first 4 in nextAsks -> current4DisplayedAsks
			for (let i = 0; i < 1; i++) {
				const currentMatch = newState.nextMatches.shift();
				if (currentMatch !== undefined) {
					if (currentMatch.name === undefined) {
						currentMatch.name = 'Anonymous';
					}
					//console.log('currentMatch = ', currentMatch);
					newState.current1DisplayedMatches.push(currentMatch);
				}
			}
			return newState;
		default:
			return state;
	}
}
