import axios from 'axios';
import { SAVE_FETCHED_LANDING_ASKS, ON_VOTE_LANDING } from './types';

export const fetchLandingPageSortingHatAsks = () => async dispatch => {
	const response = await axios.get('/api/sorting_hat/landing_asks');
	dispatch({
		type: SAVE_FETCHED_LANDING_ASKS,
		landingAsks: response.data
	});
};

export const onVoteLanding = (answerIndex, answerId, askIndex) => dispatch => {
	dispatch({
		type: ON_VOTE_LANDING,
		answerIndex: answerIndex,
		askIndex: askIndex
	});
};
