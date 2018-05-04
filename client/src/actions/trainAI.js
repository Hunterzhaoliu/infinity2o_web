import axios from 'axios';
import {
	ON_VOTE,
	UPDATE_VOTED_ASK,
	SAVE_FETCHED_INITIAL_ASKS,
	SAVE_FETCHED_NEXT_ASKS,
	UPDATE_INITIAL_4_ASKS,
	SAVE_VOTE_START,
	SAVE_VOTE_DONE,
	SAVE_VOTE_ERROR,
	ON_NEXT_ASK,
	ON_NEWEST_ASKS,
	ON_POPULAR_ASKS,
	ON_CONTROVERSIAL_ASKS,
	UPDATE_TOTAL_USER_VOTES_ACROSS_ALL_SESSIONS,
	RUNNING_ATHENA_FOR_USER_START,
	RUNNING_ATHENA_FOR_USER_DONE,
	RUNNING_ATHENA_FOR_USER_ERROR
} from './types';
import { MINIMUM_VOTES_TO_GET_IMMEDIATE_MATCH } from '../utils/constants';
import { store } from '../index';

export const onNewestAsks = colorTheme => dispatch => {
	dispatch({
		type: ON_NEWEST_ASKS
	});
};

export const onPopularAsks = colorTheme => dispatch => {
	dispatch({
		type: ON_POPULAR_ASKS
	});
};

export const onControversialAsks = colorTheme => dispatch => {
	dispatch({
		type: ON_CONTROVERSIAL_ASKS
	});
};

export const onVote = (
	answerIndex,
	answerId,
	askIndex,
	askId,
	history
) => async dispatch => {
	dispatch({ type: SAVE_VOTE_START, saveIndex: askIndex });
	dispatch({
		type: ON_VOTE,
		answerIndex: answerIndex,
		askIndex: askIndex
	});

	const voteInfo = {
		answerId: answerId,
		askId: askId
	};
	const response = await axios.put('/api/train_ai/vote', voteInfo);
	//response.data === askInDB
	dispatch({
		type: UPDATE_VOTED_ASK,
		askIndex: askIndex,
		newAsk: response.data
	});

	if (response.status === 200) {
		dispatch({ type: SAVE_VOTE_DONE, saveIndex: askIndex });
	} else {
		dispatch({ type: SAVE_VOTE_ERROR, saveIndex: askIndex });
	}

	// for running minerva the first time user logins and votes
	dispatch({
		type: UPDATE_TOTAL_USER_VOTES_ACROSS_ALL_SESSIONS,
		additionalVotes: 1
	});

	if (
		!store.getState().profile.ranInitialMinerva &&
		store.getState().matches.totalUserVotesAcrossAllSessions >=
			MINIMUM_VOTES_TO_GET_IMMEDIATE_MATCH
	) {
		dispatch({
			type: RUNNING_ATHENA_FOR_USER_START
		});
		history.push('/matches');
		const info = {
			mongoDBUserId: store.getState().auth.mongoDBUserId
		};
		const response = await axios.post('/api/matches/initial', info);

		if (response.status === 200) {
			dispatch({
				type: RUNNING_ATHENA_FOR_USER_DONE
			});
		} else {
			dispatch({
				type: RUNNING_ATHENA_FOR_USER_ERROR
			});
		}
	}
};

export const fetchUserTrainAIAsks = async (dispatch, mongoDBUserId) => {
	const nextAsks = await axios.get(
		'/api/train_ai/initial_asks?mongoDBUserId=' + mongoDBUserId
	);
	dispatch({
		type: SAVE_FETCHED_INITIAL_ASKS,
		nextAsks: nextAsks
	});
	dispatch({
		type: UPDATE_INITIAL_4_ASKS
	});
};

export const onNextAsk = (
	nextAsks,
	removeAskIndex,
	mongoDBUserId
) => async dispatch => {
	if (nextAsks.length < 1) {
		const newNextAsks = await axios.get(
			'/api/train_ai/next_asks?mongoDBUserId=' + mongoDBUserId
		);
		dispatch({
			type: SAVE_FETCHED_NEXT_ASKS,
			nextAsks: newNextAsks
		});
		dispatch({
			type: ON_NEXT_ASK,
			removeAskIndex: removeAskIndex
		});
	} else {
		dispatch({
			type: ON_NEXT_ASK,
			removeAskIndex: removeAskIndex
		});
	}
};
