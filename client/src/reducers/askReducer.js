import {
	ON_CHANGE_QUESTION,
	ON_CLICK_ADD_ANSWER,
	ON_CHANGE_ANSWERS,
	SAVE_QUESTION_START,
	SAVE_QUESTION_DONE,
	SAVE_QUESTION_ERROR
} from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	newQuestion: null,
	newAnswers: [],
	questionLength: 0,
	hasQuestionError: false,
	hasAnswersError: false,
	save: null
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case ON_CHANGE_QUESTION:
			newState.newQuestion = action.newQuestion;
			newState.questionLength = action.newQuestion.length;
			if (newState.questionLength > 50) {
				newState.hasQuestionError = true;
			} else {
				newState.hasQuestionError = false;
			}
			return newState;
		case ON_CLICK_ADD_ANSWER:
			newState.newAnswers.push('');
			return newState;
		case ON_CHANGE_ANSWERS:
			newState.newAnswers = action.newAnswers;
			newState.hasAnswersError = action.hasError;
			return newState;
		case SAVE_QUESTION_START:
			newState.save = 'save_start';
			return newState;
		case SAVE_QUESTION_DONE:
			newState.save = 'save_success';
			return newState;
		case SAVE_QUESTION_ERROR:
			newState.save = 'save_error';
			return newState;
		default:
			return state;
	}
}
