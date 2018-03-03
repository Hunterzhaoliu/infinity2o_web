import axios from 'axios';
import {
	ON_CHANGE_QUESTION,
	ON_CLICK_ADD_ANSWER,
	ON_CHANGE_ANSWER,
	SAVE_QUESTION_START,
	SAVE_QUESTION_DONE,
	SAVE_QUESTION_ERROR
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

export const saveAsk = values => async dispatch => {
	dispatch({ type: SAVE_QUESTION_START });

	//const response = await axios.post('/api/ask', values);
	// if (response.status === 200) {
	// 	dispatch({ type: SAVE_QUESTION_DONE });
	// } else {
	// 	dispatch({ type: SAVE_QUESTION_ERROR });
	// }
};
