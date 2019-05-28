import {
	OPEN_ASK_MODAL,
	CLOSE_ASK_MODAL,
	ON_CHANGE_QUESTION,
	ON_CLICK_ADD_ANSWER,
	ON_CHANGE_ANSWER,
	SAVE_QUESTION_START,
	SAVE_QUESTION_DONE,
	SAVE_QUESTION_ERROR,
	ON_CLICK_REMOVE_ANSWER,
	DUPLICATE_ANSWER_ERROR
} from "../actions/types";

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	isAskModalOpen: false,
	newQuestion: "",
	newAnswers: ["", ""],
	questionLength: 0,
	hasQuestionError: false,
	hasAnswersError: [false, false, false, false],
	displayAddAnswerButton: true,
	displayRemoveAnswerButton: false,
	hasDuplicateAnswerError: false,
	save: null
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case OPEN_ASK_MODAL:
			newState.isAskModalOpen = true;
			return newState;
		case CLOSE_ASK_MODAL:
			newState.isAskModalOpen = false;
			return newState;
		case ON_CHANGE_QUESTION:
			newState.newQuestion = action.newQuestion;
			newState.questionLength = action.newQuestion.length;
			newState.hasQuestionError = action.hasError;
			return newState;
		case ON_CLICK_ADD_ANSWER:
			if (newState.newAnswers.length < 4) {
				newState.newAnswers.push("");
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
		case DUPLICATE_ANSWER_ERROR:
			newState.hasDuplicateAnswerError = action.has;
			return newState;
		case ON_CLICK_REMOVE_ANSWER:
			newState.newAnswers.pop();
			if (newState.newAnswers.length <= 2) {
				newState.displayRemoveAnswerButton = false;
			}
			if (newState.newAnswers.length < 4) {
				newState.displayAddAnswerButton = true;
			}

			let foundDuplicate = false;
			const answerIndex = 0;
			const newAnswer = newState.newAnswers[answerIndex];
			for (let i = 0; i < newState.newAnswers.length; i++) {
				if (newAnswer === newState.newAnswers[i] && i !== answerIndex) {
					newState.hasDuplicateAnswerError = true;
					foundDuplicate = true;
				}
			}
			if (!foundDuplicate) {
				newState.hasDuplicateAnswerError = false;
			}
			return newState;
		case SAVE_QUESTION_START:
			newState.save = "save_start";
			return newState;
		case SAVE_QUESTION_DONE:
            newState = initialState;
			newState.save = "save_done";
			return newState;
		case SAVE_QUESTION_ERROR:
			newState.save = "save_error";
			return newState;
		default:
			return state;
	}
}
