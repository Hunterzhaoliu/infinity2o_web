import axios from 'axios';
import { ON_VOTE, SAVE_FETCHED_ASKS } from './types';

export const onVote = answerChoosen => dispatch => {
	dispatch({ type: ON_VOTE, answerChoosen: answerChoosen });
};

export const fetchUserTrainAIAsks = () => async dispatch => {
	const response = await axios.get('/api/train_ai');
	dispatch({
		type: SAVE_FETCHED_ASKS,
		mostRecent4Asks: response
	});
};
