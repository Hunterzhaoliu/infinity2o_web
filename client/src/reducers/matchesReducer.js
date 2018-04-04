import {
	SAVE_FETCHED_DAILY_MATCHES,
	UPDATE_INITIAL_MATCH,
	ON_NEXT_MATCH,
	DELETE_MATCH_IN_DB,
	DELETE_MATCH_IN_DB_ERROR
} from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	current1DisplayedMatches: [],
	nextMatches: [],
	hasDeleteMatchInDBError: false
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
		case ON_NEXT_MATCH:
			if (newState.nextMatches.length === 0) {
				newState.current1DisplayedMatches.shift();
			} else {
				const currentMatch = newState.nextMatches.shift();
				if (currentMatch.name === undefined) {
					currentMatch.name = 'Anonymous';
				}
				//console.log('currentMatch = ', currentMatch);
				newState.current1DisplayedMatches.shift();
				newState.current1DisplayedMatches.push(currentMatch);
			}
			return newState;
		case DELETE_MATCH_IN_DB:
			newState.hasDeleteMatchInDBError = false;
			return newState;
		case DELETE_MATCH_IN_DB_ERROR:
			newState.hasDeleteMatchInDBError = true;
			return newState;
		default:
			return state;
	}
}
