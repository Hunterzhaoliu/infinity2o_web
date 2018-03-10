import { ON_VOTE, SAVE_FETCHED_ASKS } from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	current4DisplayedAsks: [null, null, null, null],
	votes: {}
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case SAVE_FETCHED_ASKS:
			newState.current4DisplayedAsks = action.mostRecent4Asks.data;
			return newState;
		case ON_VOTE:
			let votedQuestion = newState.current4DisplayedAsks[action.questionIndex];
			let votedQuestionId = votedQuestion._id;
			let votedAnswer = votedQuestion.answers[action.answerIndex];
			newState.votes[votedQuestionId] = {
				question: votedQuestion.question,
				answerId: votedAnswer._id,
				answer: votedAnswer.answer
			};
			return newState;
		default:
			return state;
	}
}
