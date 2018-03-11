import axios from 'axios';
import {
	ON_VOTE,
	UPDATE_VOTED_ASK,
	SAVE_FETCHED_ASKS,
	SAVE_VOTE_START,
	SAVE_VOTE_DONE,
	SAVE_VOTE_ERROR
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

	const values1 = {
		answerId: answerId,
		askId: askId
	};
	//const reponse = await axios.get('/api/train_ai/is_revote', values1);

	const values2 = {
		//isRevote: reponse.isRevote,
		answerId: answerId,
		askId: askId
	};
	const response = await axios.put('/api/train_ai/vote', values2);
	//console.log('in action response.data.ask = ', response.data.ask);
	dispatch({
		type: UPDATE_VOTED_ASK,
		askIndex: askIndex,
		newAsk: response.data.askInDB
	});

	if (response.status === 200) {
		dispatch({ type: SAVE_VOTE_DONE });
	} else {
		dispatch({ type: SAVE_VOTE_ERROR });
	}
};

export const fetchUserTrainAIAsks = () => async dispatch => {
	const response = await axios.get('/api/train_ai');
	dispatch({
		type: SAVE_FETCHED_ASKS,
		mostRecent4Asks: response
	});
};
