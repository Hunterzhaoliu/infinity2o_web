import axios from "axios";
import {
	OPEN_ASK_MODAL,
	CLOSE_ASK_MODAL,
	ON_CHANGE_QUESTION,
	ON_CLICK_ADD_ANSWER,
	ON_CHANGE_ANSWER,
	SAVE_QUESTION_START,
	SAVE_QUESTION_DONE,
	SAVE_QUESTION_ERROR,
	ADD_NEW_ASK_TO_STATE,
	ON_CLICK_REMOVE_ANSWER,
	DUPLICATE_ANSWER_ERROR,
	ADD_NEURONS,
	ADD_NEURONS_ERROR
} from "../types";

import { isValidQuestion, isValidAnswer } from "../../utils/validateAsk";
import { NUMBER_NEURONS_GIVEN_FOR_ASK_IN_BILLIONS } from "../../containers/payment/prices";

export const openAskModal = () => dispatch => {
	dispatch({ type: OPEN_ASK_MODAL });
};

export const closeAskModal = () => dispatch => {
	dispatch({ type: CLOSE_ASK_MODAL });
};

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

export const onClickRemoveAnswer = () => dispatch => {
	dispatch({
		type: ON_CLICK_REMOVE_ANSWER
	});
};

export const onChangeAnswer = (
	newAnswer,
	answerIndex,
	previousAnswers
) => dispatch => {
	if (isValidAnswer(newAnswer)) {
		dispatch({
			type: ON_CHANGE_ANSWER,
			newAnswer: newAnswer,
			answerIndex: answerIndex,
			hasError: false
		});

		let foundDuplicate = false;
		for (let i = 0; i < previousAnswers.length; i++) {
			if (newAnswer === previousAnswers[i] && i !== answerIndex) {
				dispatch({
					type: DUPLICATE_ANSWER_ERROR,
					has: true
				});
				foundDuplicate = true;
			}
		}
		if (!foundDuplicate) {
			dispatch({
				type: DUPLICATE_ANSWER_ERROR,
				has: false
			});
		}
	} else {
		dispatch({
			type: ON_CHANGE_ANSWER,
			newAnswer: newAnswer,
			answerIndex: answerIndex,
			hasError: true
		});
	}
};

export const saveAndAddNeurons = async (
	mongoDBUserId,
	dispatch,
	neuronsInBillions
) => {
	const info = {
		mongoDBUserId: mongoDBUserId,
		neuronsInBillions: neuronsInBillions
	};
	const response2 = await axios.put("/api/profile/add_neurons", info);
	if (response2.status === 200) {
		dispatch({
			type: ADD_NEURONS,
			neuronsInBillions: neuronsInBillions
		});
	} else {
		dispatch({ type: ADD_NEURONS_ERROR });
	}
};

export const saveAsk = (ask, mongoDBUserId) => async dispatch => {
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
	const response = await axios.post("/api/ask", ask);
	if (response.status === 200) {
		// sends new Ask to SortingHat reducer
		dispatch({ type: ADD_NEW_ASK_TO_STATE, ask: response.data });
		dispatch({ type: SAVE_QUESTION_DONE });
		saveAndAddNeurons(
			mongoDBUserId,
			dispatch,
			NUMBER_NEURONS_GIVEN_FOR_ASK_IN_BILLIONS
		);
	} else {
		dispatch({ type: SAVE_QUESTION_ERROR });
	}
};
