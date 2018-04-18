import {
	ON_CHANGE_QUESTION,
	ON_CLICK_ADD_ANSWER,
	ON_CHANGE_ANSWER,
	SAVE_QUESTION_START,
	SAVE_QUESTION_DONE,
	SAVE_QUESTION_ERROR,
	ON_CLICK_REMOVE_ANSWER
} from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	newQuestion: null,
	newAnswers: ['', ''],
	questionLength: 0,
	hasQuestionError: false,
	hasAnswersError: [false, false, false, false],
	displayAddAnswerButton: true,
	displayRemoveAnswerButton: false,
	save: null
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case ON_CHANGE_QUESTION:
			newState.newQuestion = action.newQuestion;
			newState.questionLength = action.newQuestion.length;
			newState.hasQuestionError = action.hasError;
			return newState;
		case ON_CLICK_ADD_ANSWER:
			if (newState.newAnswers.length < 4) {
				newState.newAnswers.push('');
				if (newState.newAnswers.length === 4) {
					newState.displayAddAnswerButton = false;
				}
				if (newState.newAnswers.length >= 3) {
					newState.displayRemoveAnswerButton = true;
				}
			}
			return newState;
		case ON_CHANGE_ANSWER:
			newState.newAnswers[action.answerIndex] = action.newAnswer;
			newState.hasAnswersError[action.answerIndex] = action.hasError;
			return newState;
		case ON_CLICK_REMOVE_ANSWER:
			newState.newAnswers.pop();
			if (newState.newAnswers.length <= 2) {
				newState.displayRemoveAnswerButton = false;
			}
			if (newState.newAnswers.length < 4) {
				newState.displayAddAnswerButton = true;
			}
			return newState;
		case SAVE_QUESTION_START:
			newState.save = 'save_start';
			return newState;
		case SAVE_QUESTION_DONE:
			newState.save = 'save_done';
			return newState;
		case SAVE_QUESTION_ERROR:
			newState.save = 'save_error';
			return newState;
		default:
			return state;
	}
}
