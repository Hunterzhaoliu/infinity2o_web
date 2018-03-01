import axios from 'axios';
import {
	ON_CHANGE_QUESTION,
	ON_CLICK_ADD_ANSWER,
	ON_CHANGE_ANSWERS,
	SAVE_QUESTION_START,
	SAVE_QUESTION_DONE,
	SAVE_QUESTION_ERROR
} from './types';

export function onChangeQuestion(newQuestion) {
	return function(dispatch) {
		//console.log('newQuestion = ', newQuestion);
		dispatch({ type: ON_CHANGE_QUESTION, newQuestion: newQuestion });
	};
}

export const onClickAddAnswer = () => dispatch => {
	dispatch({ type: ON_CLICK_ADD_ANSWER });
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
