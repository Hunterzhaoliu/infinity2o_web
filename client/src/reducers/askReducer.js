import {
	ON_CHANGE_QUESTION,
	ON_CLICK_ADD_ANSWER,
	ON_CHANGE_ANSWER,
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
	hasAnswersError: [[false, false, false, false], false],
	save: null
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case ON_CHANGE_QUESTION:
			newState.newQuestion = action.newQuestion;
			newState.questionLength = action.newQuestion.length;
			if (
				newState.questionLength > 50 ||
				newState.questionLength < 5 ||
				action.hasError
			) {
				newState.hasQuestionError = true;
			} else {
				newState.hasQuestionError = false;
			}
			return newState;
		case ON_CLICK_ADD_ANSWER:
			if (newState.newAnswers.length < 4) {
				newState.newAnswers.push('');
			} else {
				newState.hasAnswersError[1] = true;
			}
			return newState;
		case ON_CHANGE_ANSWER:
			newState.newAnswers[action.answerIndex] = action.newAnswer;
			if (action.newAnswer.length > 20 || action.hasError) {
				newState.hasAnswersError[0][action.answerIndex] = true;
			} else {
				newState.hasAnswersError[0][action.answerIndex] = false;
			}
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
