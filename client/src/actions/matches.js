import axios from 'axios';
import { SAVE_FETCHED_DAILY_MATCHES, UPDATE_INITIAL_MATCH } from './types';

export const fetchUserMatches = async (dispatch, mongoDBUserIds) => {
	const response = await axios.get(
		'/api/matches?mongoDBUserIds=' + mongoDBUserIds
	);
	dispatch({
		type: SAVE_FETCHED_DAILY_MATCHES,
		dailyMatches: response.data
	});
	dispatch({
		type: UPDATE_INITIAL_MATCH
	});
};
