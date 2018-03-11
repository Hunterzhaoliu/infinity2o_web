import {
	ON_VOTE,
	SAVE_FETCHED_ASKS,
	SAVE_VOTE_START,
	SAVE_VOTE_DONE,
	SAVE_VOTE_ERROR
} from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	current4DisplayedAsks: [null, null, null, null],
	votes: {},
	save: null
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case SAVE_FETCHED_ASKS:
			newState.current4DisplayedAsks = action.mostRecent4Asks.data;
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
