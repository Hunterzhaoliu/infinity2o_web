import {
	ON_VOTE,
	UPDATE_VOTED_ASK,
	SAVE_FETCHED_ASKS,
	SAVE_VOTE_START,
	SAVE_VOTE_DONE,
	SAVE_VOTE_ERROR
} from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	current4DisplayedAsks: [],
	votes: {},
	save: null
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case SAVE_FETCHED_ASKS:
			console.log('action.askIndex = ', action.removeAskIndex);
			if (action.removeAskIndex === undefined) {
				for (let i = 0; i < 4; i++) {
					newState.current4DisplayedAsks.push(
						action.mostRecent16Asks.data[i]
					);
				}
			} else {
				action.current4DisplayedAsks[action.removeAskIndex] =
					action.mostRecent16Asks.data[3 + action.removeAskIndex];
				newState.current4DisplayedAsks = action.current4DisplayedAsks;
			}
			return newState;
		case ON_VOTE:
			let votedAsk = newState.current4DisplayedAsks[action.askIndex];
			let votedAskId = votedAsk._id;
			let votedAnswer = votedAsk.answers[action.answerIndex];
			newState.votes[votedAskId] = {
				question: votedAsk.question,
				answerId: votedAnswer._id,
				answer: votedAnswer.answer
			};
			return newState;
		case UPDATE_VOTED_ASK:
			newState.current4DisplayedAsks[action.askIndex] = action.newAsk;
			return newState;
		case SAVE_VOTE_START:
			newState.save = 'save_start';
			return newState;
		case SAVE_VOTE_DONE:
			newState.save = 'save_done';
			return newState;
		case SAVE_VOTE_ERROR:
			newState.save = 'save_error';
			return newState;
		default:
			return state;
	}
}
