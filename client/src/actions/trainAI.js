import axios from 'axios';
import { ON_VOTE } from './types';

export const onVote = answerChoosen => dispatch => {
	dispatch({ type: ON_VOTE, answerChoosen: answerChoosen });
};

export const fetchUserTrainAIAsks = () => async dispatch => {
	console.log('inside fetchUserTrainAIAsks');
	const response = await axios.get('/api/train_ai');
	// dispatch({
	//     type: SAVE_FETCHED_USER_PROFILE,
	//     profile: response.data.profile
	// });
};
