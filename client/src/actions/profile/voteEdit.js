import axios from 'axios';
import {
	ON_PRESS_PAGE,
	FETCH_ASK_TO_REVOTE_START,
	FETCH_ASK_TO_REVOTE_DONE,
	FETCH_ASK_TO_REVOTE_ERROR,
	SAVE_REVOTE_START,
	SAVE_REVOTE_DONE,
	SAVE_REVOTE_ERROR
} from '../types';

export const onPressPage = newPage => dispatch => {
	dispatch({ type: ON_PRESS_PAGE, newPage: newPage });
};

export const onPressAsk = (
	mongoDBAskId,
	index,
	previousMongoDBAnswerId
) => async dispatch => {
	dispatch({
		type: FETCH_ASK_TO_REVOTE_START,
		index: index,
		previousMongoDBAnswerId: previousMongoDBAnswerId
	});

	const askToRevoteResponse = await axios.get(
		'/api/voteEdit?mongoDBAskId=' + mongoDBAskId
	);

	if (askToRevoteResponse.status === 200) {
		dispatch({
			type: FETCH_ASK_TO_REVOTE_DONE,
			index: index,
			askToRevote: askToRevoteResponse.data,
			previousMongoDBAnswerId: previousMongoDBAnswerId
		});
	} else {
		dispatch({ type: FETCH_ASK_TO_REVOTE_ERROR, index: index });
	}
};

export const onRevote = (
	mongoDBAskId,
	mongoDBAnswerId,
	previousMongoDBAnswerId,
	answerIndex,
	newAnswer,
	currentMongoDBAnswerId
) => async dispatch => {
	const isNotSameAsPreviousOnFirstRevote =
		currentMongoDBAnswerId === null &&
		mongoDBAnswerId !== previousMongoDBAnswerId;
	const isNotSameAsPreviousLater =
		currentMongoDBAnswerId !== null &&
		currentMongoDBAnswerId !== mongoDBAnswerId;
	if (isNotSameAsPreviousOnFirstRevote || isNotSameAsPreviousLater) {
		dispatch({
			type: SAVE_REVOTE_START,
			answerIndex: answerIndex,
			mongoDBAnswerId: mongoDBAnswerId
		});
		const revoteInfo = {
			mongoDBAskId: mongoDBAskId,
			mongoDBAnswerId: mongoDBAnswerId,
			previousMongoDBAnswerId: previousMongoDBAnswerId,
			newAnswer: newAnswer
		};

		const response = await axios.put('/api/train_ai/revote', revoteInfo);
		if (response.status === 200) {
			dispatch({
				type: SAVE_REVOTE_DONE,
				answerIndex: answerIndex,
				revotedAsk: response.data
			});
		} else {
			dispatch({ type: SAVE_REVOTE_ERROR, answerIndex: answerIndex });
		}
	} else {
		return;
	}
};
