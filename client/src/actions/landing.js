import axios from "axios";
import {
	SAVE_FETCHED_LANDING_ASKS,
	ON_VOTE_LANDING,
	CLOSE_MODAL
} from "./types";

export const fetchLandingPageSortingHatAsks = () => async dispatch => {
	const response = await axios.get("/api/sorting_hat/landing_asks");
	dispatch({
		type: SAVE_FETCHED_LANDING_ASKS,
		landingAsks: response.data
	});
};

export const onVoteLanding = (
	answerIndex,
	askIndex,
	isFirstVote
) => dispatch => {
	dispatch({
		type: ON_VOTE_LANDING,
		answerIndex: answerIndex,
		askIndex: askIndex,
		isFirstVote: isFirstVote
	});
};

export const closeModal = () => dispatch => {
	dispatch({
		type: CLOSE_MODAL
	});
};
