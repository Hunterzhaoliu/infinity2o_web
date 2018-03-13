import {
	SAVE_FETCHED_ASKS,
	UPDATE_INITIAL_4_ASKS,
	ON_VOTE,
	UPDATE_VOTED_ASK,
	SAVE_VOTE_START,
	SAVE_VOTE_DONE,
	SAVE_VOTE_ERROR,
	ON_NEXT_ASK
} from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	current4DisplayedAsks: [],
	nextAsks: [],
	nextAsksDateRange: {},
	votes: {},
	save: null
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
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
		case ON_NEXT_ASK:
			const replacementAsk = newState.nextAsks.shift();
			newState.current4DisplayedAsks[action.removeAskIndex] = replacementAsk;
			return newState;
		case SAVE_FETCHED_ASKS:
			newState.nextAsks = action.nextAsks.data;
			const nextAsksLastIndex = newState.nextAsks.length - 1;
			newState.nextAsksDateRange.newestAskDate = newState.nextAsks[0].dateAsked;
			newState.nextAsksDateRange.oldestAskDate =
				newState.nextAsks[nextAsksLastIndex].dateAsked;
			return newState;
		case UPDATE_INITIAL_4_ASKS:
			// we move the first 4 in nextAsks -> current4DisplayedAsks
			for (let i = 0; i < 4; i++) {
				const currentAsk = newState.nextAsks.shift();
				if (currentAsk !== undefined) {
					newState.current4DisplayedAsks.push(currentAsk);
				}
			}
			return newState;
		default:
			return state;
	}
}
