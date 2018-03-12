import axios from 'axios';
import {
	ON_VOTE,
	UPDATE_VOTED_ASK,
	SAVE_FETCHED_ASKS,
	UPDATE_INITIAL_4_ASKS,
	SAVE_VOTE_START,
	SAVE_VOTE_DONE,
	SAVE_VOTE_ERROR,
	ON_NEXT_ASK
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

export const fetchUserTrainAIAsks = () => async dispatch => {
	const nextAsks = await axios.get('/api/train_ai/next_asks');
	dispatch({
		type: SAVE_FETCHED_ASKS,
		nextAsks: nextAsks
	});
	dispatch({
		type: UPDATE_INITIAL_4_ASKS
	});
};

export const onNextAsk = (nextAsks, removeAskIndex) => async dispatch => {
	if (nextAsks.length < 1) {
		const newNextAsks = await axios.get('/api/train_ai/next_asks');
		dispatch({
			type: SAVE_FETCHED_ASKS,
			nextAsks: newNextAsks
		});
		dispatch({
			type: ON_NEXT_ASK,
			removeAskIndex: removeAskIndex
		});
	} else {
		dispatch({
			type: ON_NEXT_ASK,
			removeAskIndex: removeAskIndex
		});
	}
};
