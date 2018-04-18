import axios from 'axios';
import {
	ON_CHANGE_QUESTION,
	ON_CLICK_ADD_ANSWER,
	ON_CHANGE_ANSWER,
	SAVE_QUESTION_START,
	SAVE_QUESTION_DONE,
	SAVE_QUESTION_ERROR,
	ADD_NEW_ASK_TO_STATE
} from './types';

import { isValidQuestion, isValidAnswer } from '../utils/validateAsk';

export const onChangeQuestion = newQuestion => dispatch => {
	if (isValidQuestion(newQuestion)) {
		dispatch({
			type: ON_CHANGE_QUESTION,
			newQuestion: newQuestion,
			hasError: false
		});
	} else {
		dispatch({
			type: ON_CHANGE_QUESTION,
			newQuestion: newQuestion,
			hasError: true
		});
	}
};

export const onClickAddAnswer = () => dispatch => {
	dispatch({ type: ON_CLICK_ADD_ANSWER });
};

export const onChangeAnswer = (newAnswer, answerIndex) => dispatch => {
	if (isValidAnswer(newAnswer)) {
		dispatch({
			type: ON_CHANGE_ANSWER,
			newAnswer: newAnswer,
			answerIndex: answerIndex,
			hasError: false
		});
	} else {
		dispatch({
			type: ON_CHANGE_ANSWER,
			newAnswer: newAnswer,
			answerIndex: answerIndex,
			hasError: true
		});
	}
};

export const saveAsk = (ask, history) => async dispatch => {
	dispatch({ type: SAVE_QUESTION_START });
	let validatedAnswers = [];
	//remove empty answers
	for (let i = 0; i < ask.newAnswers.length; i++) {
		if (ask.newAnswers[i].length > 0) {
			validatedAnswers.push(ask.newAnswers[i]);
		}
	}
	ask.newAnswers = validatedAnswers;

	// returns ask in DB
	const response = await axios.post('/api/ask', ask);
	if (response.status === 200) {
		// sends new Ask to trainAI reducer
		dispatch({ type: ADD_NEW_ASK_TO_STATE, ask: response.data})
		dispatch({ type: SAVE_QUESTION_DONE });
		history.push('/train_ai');
	} else {
		dispatch({ type: SAVE_QUESTION_ERROR });
	}
};
