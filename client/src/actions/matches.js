import axios from 'axios';
import {
	SAVE_FETCHED_DAILY_MATCHES,
	UPDATE_INITIAL_MATCH,
	ON_NEXT_MATCH,
	MOVE_TO_CONVERSATIONS,
	UPDATE_CONTACTS,
	UPDATE_CONTACTS_ERROR,
	DELETE_MATCH_IN_DB,
	DELETE_MATCH_IN_DB_ERROR
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
	// 1) need to remove match from current user
	// 2) need to remove current user from match's matches
	// 3) update current user's conversations with new conversation
	// 4) update match's conversations with new conversation

	const matchInfo = {
		matchId: matchId,
		matchName: matchName
	};
	const response = await axios.post(
		'/api/matches/start_conversation',
		matchInfo
	);
	if (response.status === 200) {
		dispatch({
			type: MOVE_TO_CONVERSATIONS
		});
		dispatch({
			type: UPDATE_CONTACTS,
			contacts: response.data
		});
		history.push('/conversations');
	} else {
		dispatch({ type: UPDATE_CONTACTS_ERROR });
	}

	const response2 = await axios.delete('/api/matches/delete_match', matchId);
	if (response2.status === 200) {
		dispatch({
			type: DELETE_MATCH_IN_DB
		});
	} else {
		dispatch({ type: DELETE_MATCH_IN_DB_ERROR });
	}
};
