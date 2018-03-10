import axios from 'axios';
import { ON_VOTE, SAVE_FETCHED_ASKS } from './types';

export const onVote = (answerIndex, questionIndex) => async dispatch => {
	dispatch({
		type: ON_VOTE,
		answerIndex: answerIndex,
		questionIndex: questionIndex
	});
	// TODO: hit the database const response = await axios.put('/api/train_ai/vote');
};

export const fetchUserTrainAIAsks = () => async dispatch => {
	const response = await axios.get('/api/train_ai');
	dispatch({
		type: SAVE_FETCHED_ASKS,
		mostRecent4Asks: response
	});
};
