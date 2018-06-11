import axios from 'axios';
import { SAVE_FETCHED_LANDING_ASKS } from './types';

export const fetchLandingPageSortingHatAsks = () => async dispatch => {
	const response = await axios.get('/api/sorting_hat/landing_asks');
	dispatch({
		type: SAVE_FETCHED_LANDING_ASKS,
		landingAsks: response.data
	});
};
