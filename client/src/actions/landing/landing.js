import axios from 'axios';
import { SAVE_FETCHED_INITIAL_ASKS, UPDATE_INITIAL_4_ASKS } from '../types';

export const fetchUserSortingHatAsks = async (dispatch, mongoDBUserId) => {
	const nextAsks = await axios.get(
		'/api/sorting_hat/initial_asks?mongoDBUserId=' + mongoDBUserId
	);
	dispatch({
		type: SAVE_FETCHED_INITIAL_ASKS,
		nextAsks: nextAsks
	});
	dispatch({
		type: UPDATE_INITIAL_4_ASKS
	});
};
