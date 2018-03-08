import axios from 'axios';
import { ON_VOTE, SAVE_FETCHED_ASKS } from './types';

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
	const response = await axios.get('/api/train_ai');
	dispatch({
		type: SAVE_FETCHED_ASKS,
		mostRecent4Asks: response
	});
};
>>>>>>> 0fc78c83486c2a37420c1b3ce0ab307dc1d2308b
