import axios from 'axios';
import {
	SAVE_FETCHED_DAILY_MATCHES,
	UPDATE_INITIAL_MATCH,
	ON_NEXT_MATCH,
	MOVE_TO_CONVERSATIONS,
	MOVE_TO_CONVERSATIONS_ERROR
} from './types';

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

export const onNextMatch = () => dispatch => {
	dispatch({
		type: ON_NEXT_MATCH
	});
};

export const onStartConversation = (
	history,
	matchName,
	matchId
) => async dispatch => {
	const matchInfo = {
		matchId: matchId,
		matchName: matchName
	};
	//console.log('matchInfo inside matches action = ', matchInfo);

	const response = await axios.post('/api/matches', matchInfo);
	if (response.status === 200) {
		dispatch({
			type: MOVE_TO_CONVERSATIONS,
			conversations: response.data
		});
		history.push('/conversations');
	} else {
		dispatch({ type: MOVE_TO_CONVERSATIONS_ERROR });
	}
};
