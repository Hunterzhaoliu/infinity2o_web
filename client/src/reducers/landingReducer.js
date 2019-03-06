import {
	SAVE_FETCHED_LANDING_ASKS,
	ON_VOTE_LANDING,
	CLOSE_FIRST_VOTE_MODAL
} from "../actions/types";

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	landingAsks: [],
	votes: {},
	numberOfLandingVotes: 0,
	isFirstVoteModalOpen: false
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case SAVE_FETCHED_LANDING_ASKS:
			newState.landingAsks = action.landingAsks;
			return newState;
		case ON_VOTE_LANDING:
			let votedAsk = newState.landingAsks[action.askIndex];
			let votedAskId = votedAsk._id;
			let votedAnswer = votedAsk.answers[action.answerIndex];
			newState.votes[votedAskId] = {
				question: votedAsk.question,
				answerId: votedAnswer._id,
				answer: votedAnswer.answer
			};
			newState.numberOfLandingVotes += 1;
			newState.isFirstVoteModalOpen = action.isFirstVote;
			return newState;
		case CLOSE_FIRST_VOTE_MODAL:
			newState.isFirstVoteModalOpen = false;
			return newState;
		default:
			return state;
	}
}
