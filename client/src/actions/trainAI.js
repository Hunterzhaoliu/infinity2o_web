import axios from 'axios';
import {
	ON_VOTE,
	UPDATE_VOTED_ASK,
	SAVE_FETCHED_ASKS,
	SAVE_VOTE_START,
	SAVE_VOTE_DONE,
	SAVE_VOTE_ERROR,
	ON_NEXT_QUESTION
} from './types';

export const onVote = (
	answerIndex,
	answerId,
	askIndex,
	askId
) => async dispatch => {
	dispatch({ type: SAVE_VOTE_START });
	dispatch({
		type: ON_VOTE,
		answerIndex: answerIndex,
		askIndex: askIndex
	});

	const voteInfo = {
		answerId: answerId,
		askId: askId
	};
	const response = await axios.put('/api/train_ai/vote', voteInfo);
	// console.log('in action response.data = ', response.data);
	//response.data === askInDB
	dispatch({
		type: UPDATE_VOTED_ASK,
		askIndex: askIndex,
		newAsk: response.data
	});

	if (response.status === 200) {
		dispatch({ type: SAVE_VOTE_DONE });
	} else {
		dispatch({ type: SAVE_VOTE_ERROR });
	}
};

export const fetchUserTrainAIAsks = (
	askIndex,
	current4DisplayedAsks
) => async dispatch => {
	const mostRecent16Asks = await axios.get('/api/train_ai');
	dispatch({
		type: SAVE_FETCHED_ASKS,
		mostRecent16Asks: mostRecent16Asks,
		askIndex: askIndex,
		current4DisplayedAsks: current4DisplayedAsks
	});
};
