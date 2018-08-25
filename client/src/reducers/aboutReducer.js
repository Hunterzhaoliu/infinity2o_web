import { SAVE_FETCHED_TEAM_INFO } from "../actions/types";

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	teamMembers: null
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case SAVE_FETCHED_TEAM_INFO:
			newState.teamMembers = action.teamMembers;
			return newState;
		default:
			return state;
	}
}
