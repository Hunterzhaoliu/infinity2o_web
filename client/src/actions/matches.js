import {
	SAVE_FETCHED_DAILY_MATCHES,
	UPDATE_INITIAL_MATCH,
	ON_NEXT_MATCH
} from './types';

export const fetchUserMatches = async (dispatch, mongoDBUserId) => {
	const dailyMatches = await axios.get(
		'/api/matches?mongoDBUserId=' + mongoDBUserId
	);
	dispatch({
		type: SAVE_FETCHED_DAILY_MATCHES,
		nextAsks: dailyMatches
	});
	dispatch({
		type: UPDATE_INITIAL_MATCH
	});
};
