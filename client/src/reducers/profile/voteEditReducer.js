import {
	ON_PRESS_PAGE,
	FETCH_ASK_TO_REVOTE_START,
	FETCH_ASK_TO_REVOTE_DONE,
	FETCH_ASK_TO_REVOTE_ERROR,
	SAVE_REVOTE_START,
	SAVE_REVOTE_DONE,
	SAVE_REVOTE_ERROR,
	CLOSE_REVOTE_MODAL
} from "../../actions/types";

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	page: 1,
	fetchState: {},
	askToRevote: null,
	revoteSaveState: {},
	previousMongoDBAnswerId: null,
	currentMongoDBAnswerId: null,
	isRevoteModalOpen: false
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case ON_PRESS_PAGE:
			newState.page = action.newPage;
			return newState;
		case FETCH_ASK_TO_REVOTE_START:
			newState.fetchState[action.index] = "start";
			newState.previousMongoDBAnswerId = action.previousMongoDBAnswerId;
			return newState;
		case FETCH_ASK_TO_REVOTE_DONE:
			newState.fetchState = {};
			newState.fetchState[action.index] = "done";
			newState.askToRevote = action.askToRevote;
			newState.isRevoteModalOpen = true;
			return newState;
		case FETCH_ASK_TO_REVOTE_ERROR:
			newState.fetchState[action.index] = "error";
			return newState;
		case SAVE_REVOTE_START:
			newState.currentMongoDBAnswerId = action.mongoDBAnswerId;
			newState.previousMongoDBAnswerId = action.mongoDBAnswerId;
			newState.revoteSaveState[action.answerIndex] = "start";
			return newState;
		case SAVE_REVOTE_DONE:
			newState.revoteSaveState = {};
			newState.revoteSaveState[action.answerIndex] = "done";
			newState.askToRevote = action.revotedAsk;
			return newState;
		case SAVE_REVOTE_ERROR:
			newState.revoteSaveState[action.answerIndex] = "error";
			return newState;
		case CLOSE_REVOTE_MODAL:
			newState.isRevoteModalOpen = false;
			return newState;
		default:
			return state;
	}
}
