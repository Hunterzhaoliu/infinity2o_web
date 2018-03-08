import axios from 'axios';
import { ON_VOTE } from './types';

<<<<<<< HEAD
export function onVote(answerChosen) {
	return function(dispatch) {
		dispatch({ type: ON_VOTE, answerChosen: answerChosen });
	};
}
=======
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
>>>>>>> 0fc78c83486c2a37420c1b3ce0ab307dc1d2308b
