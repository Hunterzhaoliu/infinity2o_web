import axios from "axios";
import {
	SAVE_FETCHED_DAILY_MATCHES,
	UPDATE_INITIAL_MATCH,
	ON_NEXT_MATCH,
	MOVE_TO_CONVERSATIONS,
	DELETED_MATCH_IN_DB,
	DELETED_MATCH_IN_DB_ERROR,
	DECREMENT_NUMBER_OF_UNSEEN_MATCHES
} from "../types";

export const fetchUserMatches = mongoDBUserId => async dispatch => {
	// runs on Matches page
	const matchesInfo = await axios.get("/api/matches");
	dispatch({
		type: SAVE_FETCHED_DAILY_MATCHES,
		dailyMatches: matchesInfo.data
	});
	dispatch({
		type: UPDATE_INITIAL_MATCH
	});
};

export const checkIfMatchSeen = (
	matchNeededToBeChecked,
	mongoDBUserId
) => async dispatch => {
	if (matchNeededToBeChecked !== undefined) {
		if (matchNeededToBeChecked["seen"]) {
			// already seen this match
		} else {
			dispatch({
				type: DECREMENT_NUMBER_OF_UNSEEN_MATCHES,
				basicMatchInfoIndex: 0
			});

			// mongoDB hit that changes if the match seen status
			const seenInfo = {
				userId: mongoDBUserId,
				matchId: matchNeededToBeChecked["id"]
			};
			await axios.put("/api/matches/seen", seenInfo);
		}
	}
};

export const onNextMatch = (
	matchNeededToBeChecked,
	mongoDBUserId
) => async dispatch => {
	dispatch({
		type: ON_NEXT_MATCH
	});
	if (matchNeededToBeChecked !== null && mongoDBUserId !== null) {
		if (matchNeededToBeChecked["seen"]) {
			// already seen this match
		} else {
			dispatch({
				type: DECREMENT_NUMBER_OF_UNSEEN_MATCHES,
				basicMatchInfoIndex: 1
			});

			// mongoDB hit that changes if the match seen status
			const seenInfo = {
				userId: mongoDBUserId,
				matchId: matchNeededToBeChecked["id"]
			};
			await axios.put("/api/matches/seen", seenInfo);
		}
	}
};

export const onStartConversation = (
	history,
	matchName,
	matchId
) => async dispatch => {
	// 1) need to remove match from current user
	// 2) need to remove current user from match's matches
	const response1 = await axios.delete("/api/matches/delete_match", {
		data: { matchId: matchId }
	});
	if (response1.status === 200) {
		dispatch({
			type: DELETED_MATCH_IN_DB
		});

		const matchInfo = {
			matchId: matchId,
			matchName: matchName
		};
		// 3) update current user's conversations with new conversation
		// 4) update match's conversations with new conversation
		const response2 = await axios.post(
			"/api/matches/start_conversation",
			matchInfo
		);
		if (response2.status === 200) {
			dispatch({
				type: MOVE_TO_CONVERSATIONS
			});
			history.push("/conversations");
		}
	} else {
		dispatch({ type: DELETED_MATCH_IN_DB_ERROR });
	}
};
