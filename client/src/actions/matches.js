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
const amqp = require('amqplib/callback_api');

// amqp.connect('amqp://infinity2o:2134711@52.4.101.52:5672', function(err, conn) {
// 	conn.createChannel(function(err, ch) {
// 		var q = 'hello';
//
// 		ch.assertQueue(q, { durable: false });
// 		console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', q);
// 		ch.consume(
// 			q,
// 			function(msg) {
// 				console.log(' [x] Received %s', msg.content.toString());
// 			},
// 			{ noAck: true }
// 		);
// 	});
// });

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
	// 1) need to remove match from current user
	// 2) need to remove current user from match's matches
	const response1 = await axios.delete('/api/matches/delete_match', {
		data: { matchId: matchId }
	});
	if (response1.status === 200) {
		dispatch({
			type: DELETE_MATCH_IN_DB
		});

		// 3) update current user's conversations with new conversation
		// 4) update match's conversations with new conversation
		const response2 = await axios.post(
			'/api/matches/start_conversation',
			matchInfo
		);
		if (response2.status === 200) {
			dispatch({
				type: MOVE_TO_CONVERSATIONS
			});
			dispatch({
				type: UPDATE_CONTACTS,
				allContacts: response2.data
			});

			// deletes the match from the state after Say Hi
			dispatch({
				type: ON_NEXT_MATCH,
				matchId: matchId
			});
			history.push('/conversations');
		} else {
			dispatch({ type: UPDATE_CONTACTS_ERROR });
		}
	} else {
		dispatch({ type: DELETE_MATCH_IN_DB_ERROR });
	}
};
